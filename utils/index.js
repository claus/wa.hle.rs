import axios from 'axios';

export async function loadDigest() {
    const response = await axios.get('https://father.codeazur.com.br/website.json');
    const digest = Object.values(response.data)
        .sort((a, b) => {
            const aDate = new Date(a.time).getTime();
            const bDate = new Date(b.time).getTime();
            return bDate - aDate;
        });
    console.log(digest)

    const channel = await axios.get('https://father.codeazur.com.br/channel.json');

    return { digest, channel: channel.data };
}
