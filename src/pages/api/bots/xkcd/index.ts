import type { APIRoute } from 'astro';

export const prerender = false;

type XKCDResponseData = {
    num: number;
    day: string;
    month: string;
    year: string;
    title: string;
    safe_title: string;
    alt: string;
    img: string;
    img2x: string;
};

const ACTIVE = import.meta.env.XKCD_BOT_ACTIVE;
const PUBLISH = import.meta.env.XKCD_BOT_PUBLISH;
const PUBLIC = import.meta.env.XKCD_BOT_PUBLIC;

const isActive = ACTIVE === 'true' || ACTIVE === true;
const isPublish = PUBLISH === 'true' || PUBLISH === true;
const isPublic = PUBLIC === 'true' || PUBLIC === true;

export const GET: APIRoute = async () => {
    if (!isActive) {
        const message = `Bot paused`;
        return createJsonResponse({ message });
    }
    try {
        await verifyCredentials();
        const latestId = await getLatestId();
        const latestComic = await getLatestComic();
        if (!isPublish) {
            const message = `Bot inactive`;
            return createJsonResponse({
                message,
                latestIdLocal: latestId,
                latestIdRemote: latestComic.num,
            });
        }
        if (latestComic.num > latestId) {
            const image = await downloadImage(latestComic);
            const uploadResult = await uploadImage(image, latestComic);
            const publishResult = await publishStatus(uploadResult.id, latestComic);
            return createJsonResponse(publishResult);
        } else {
            const message = `No new XKCD available (latest: ${latestId})`;
            return createJsonResponse({ message });
        }
    } catch (error: any) {
        const message = error.message ?? 'Unknown error';
        const status = error.cause?.status ?? 500;
        return createJsonResponse({ error: message }, status);
    }
};

async function verifyCredentials() {
    const token = import.meta.env.XKCD_BOT_MASTODON_TOKEN;
    const response = await fetch(`https://mastodon.com.br/api/v1/apps/verify_credentials`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    if (response.status === 200) {
        return json;
    } else {
        throw new Error(json.error, { cause: { status: response.status } });
    }
}

async function getLatestId() {
    const id = import.meta.env.XKCD_BOT_MASTODON_ACCOUNT_ID;
    const token = import.meta.env.XKCD_BOT_MASTODON_TOKEN;
    const response = await fetch(
        `https://mastodon.com.br/api/v1/accounts/${id}/statuses?limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    const json = await response.json();
    const match = json
        .map((status: any) => /#(\d{4,})/.exec(status.content))
        .find((match: any) => !!match);
    if (match) {
        return +match[1];
    } else {
        throw new Error('No recent XKCD ID found');
    }
}

async function getLatestComic() {
    const response = await fetch(`https://xkcd.com/info.0.json`);
    const json = await response.json();
    if (typeof json?.num === 'number' && json.num > 0 && typeof json?.img === 'string') {
        const url = new URL(json.img);
        url.pathname = url.pathname.replace(/(\.(png|jpg|jpeg))$/, '_2x$&');
        return { ...json, img2x: url.toString() } as XKCDResponseData;
    } else {
        throw new Error(`Error retrieving latest XKCD comic`);
    }
}

async function downloadImage(comic: XKCDResponseData) {
    let response = await fetch(comic.img2x);
    if (response.status < 400) {
        return await response.blob();
    } else {
        let response = await fetch(comic.img);
        if (response.status < 400) {
            return await response.blob();
        } else {
            throw new Error(`Unable to download XKCD image ${comic.img}`);
        }
    }
}

async function uploadImage(image: Blob, comic: XKCDResponseData) {
    const token = import.meta.env.XKCD_BOT_MASTODON_TOKEN;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('description', comic.alt);
    const response = await fetch('https://mastodon.com.br/api/v2/media', {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
        body: formData,
    });
    const json = await response.json();
    if (response.status < 400) {
        return json;
    } else {
        throw new Error(json.error);
    }
}

async function publishStatus(mediaId: string, comic: XKCDResponseData) {
    const token = import.meta.env.XKCD_BOT_MASTODON_TOKEN;
    const formData = new FormData();
    formData.append('status', `#${comic.num} - ${comic.safe_title}`);
    formData.append('media_ids[]', mediaId);
    formData.append('visibility', isPublic ? 'public' : 'direct');
    const response = await fetch('https://mastodon.com.br/api/v1/statuses', {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
        body: formData,
    });
    const json = await response.json();
    if (response.status < 400) {
        return json;
    } else {
        throw new Error(json.error);
    }
}

function createJsonResponse(body: string | object | undefined | null, status: number = 200) {
    if (body == null) {
        body = { error: 'Unknown error' };
        status = 500;
    }
    return new Response(typeof body === 'string' ? body : JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
        status,
    });
}
