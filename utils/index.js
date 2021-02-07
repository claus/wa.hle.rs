import axios from 'axios';

export async function loadDigest() {
    const response = await axios.get(
        'https://father.codeazur.com.br/digest.json'
    );
    const digest = Object.entries(response.data)
        .sort(([,a], [,b]) => {
            const aDate = new Date(a.time).getTime();
            const bDate = new Date(b.time).getTime();
            return bDate - aDate;
        })
        .map(([key,value]) => ({
            ...value,
            sha256: key
        }));
    return digest;
}

export function formatNumber(value) {
    if (value < 10) {
        return `0${value}`;
    }
    return `${value}`;
}
