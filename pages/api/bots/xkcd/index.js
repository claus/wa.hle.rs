const axios = require('axios');
const FormData = require('form-data');

function verify() {
    const token = process.env.XKCD_BOT_MASTODON_TOKEN;
    return axios
        .get(`https://mastodon.com.br/api/v1/apps/verify_credentials`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            // console.log(`${response.data.name} ok`);
        });
}

function getLatestId() {
    const id = process.env.XKCD_BOT_MASTODON_ACCOUNT_ID;
    const token = process.env.XKCD_BOT_MASTODON_TOKEN;
    return axios
        .get(`https://mastodon.com.br/api/v1/accounts/${id}/statuses`, {
            headers: { Authorization: token },
            params: { limit: 1 },
        })
        .then(response => {
            const status = response.data[0].content;
            const match = /#(\d{4,})/.exec(status);
            if (match) {
                // console.log(`Latest Mastodon ID: ${match[1]}`);
                return match[1];
            } else {
                throw new Error(`Latest status not found (${status})`);
            }
        });
}

function getLatestComic() {
    return axios.get('https://xkcd.com/info.0.json').then(response => {
        if (response.data && response.data.num > 0) {
            // console.log(`Latest XKCD ID: ${response.data.num}`);
            return response.data;
        } else {
            throw new Error(`Error retrieving latest XKCD`);
        }
    });
}

function downloadImage(url) {
    const config = {
        responseType: 'stream',
        maxContentLength: 10 * 1024 * 1024,
        maxBodyLength: 10 * 1024 * 1024,
    };
    return axios.get(url, config).then(response => {
        if (response.data) {
            return {
                contentType: response.headers['content-type'],
                contentLength: response.headers['content-length'],
                data: response.data,
            };
        } else {
            throw new Error(`Error retrieving XKCD image at ${url}`);
        }
    });
}

const uploadImage = comic => img => {
    const imgFileMeta = {
        filename: `${comic.num}.${img.contentType.split('/')[1]}`,
        contentType: img.contentType,
        knownLength: img.contentLength,
    };
    const data = new FormData();
    data.append('file', img.data, imgFileMeta);
    data.append('description', comic.alt);
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.XKCD_BOT_MASTODON_TOKEN}`,
            ...data.getHeaders(),
        },
    };
    return axios
        .post('https://mastodon.com.br/api/v1/media', data, config)
        .then(response => response.data.id);
};

const publishStatus = comic => mediaId => {
    const data = new FormData();
    data.append('status', `#${comic.num} - ${comic.safe_title}`);
    data.append('media_ids[]', mediaId);
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.XKCD_BOT_MASTODON_TOKEN}`,
            ...data.getHeaders(),
        },
    };
    return axios
        .post('https://mastodon.com.br/api/v1/statuses', data, config)
        .then(response => response.data);
};

function GET(req, res) {
    verify().then(
        Promise.all([getLatestId(), getLatestComic()])
            .then(([id, comic]) => {
                // console.log(JSON.stringify(comic, null, 4));
                if (+comic.num > +id) {
                    return downloadImage(comic.img)
                        .then(uploadImage(comic))
                        .then(publishStatus(comic))
                        .then(response => {
                            // console.log(response);
                            res.status(200);
                            res.json(response);
                        });
                } else {
                    const msg = `No new XKCD available (have: ${id}, avail: ${comic.num})`;
                    res.status(200);
                    res.json({ status: msg });
                }
            })
            .catch(err => {
                console.log(err.message);
                res.status(500);
                res.json({ error: err.message });
            })
    );
}

export default (req, res) => {
    if (req.method === 'GET') {
        GET(req, res);
    } else {
        res.status(405);
        res.json({
            status: 405,
            error: 'Method not allowed',
        });
    }
};
