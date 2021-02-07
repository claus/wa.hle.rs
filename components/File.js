import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'

import Headers from './Headers';
import FilePreview from './FilePreview';

import styles from './File.module.scss';

const File = ({ data }) => {
    const [downloadTime, setDownloadTime] = useState(null);
    const [modifiedTime, setModifiedTime] = useState(null);
    const interval = useRef();
    useEffect(() => {
        interval.current = setInterval(() => {
            setDownloadTime('(' + formatDistanceToNow(new Date(data.time), { addSuffix: true }) + ')')
            if (data.headers['last-modified']) {
                setModifiedTime('(' + formatDistanceToNow(new Date(data.headers['last-modified']), { addSuffix: true }) + ')')
            }
        }, 1000);
        return () => {
            clearInterval(interval.current);
        }
    }, [data])

    const fileName = `${data.sha256}.${data.ext}`;
    const downloadUrl = `https://father.codeazur.com.br/files/${fileName}`;
    const lastMod = data.headers['last-modified'] ? new Date(data.headers['last-modified']).toISOString() : null;
    return (
        <li className={styles.root}>
            <a className={styles.link} href={downloadUrl}>{data.url}</a>
            <div className={styles.item}>
                <span>Downloaded: </span>
                {data.time}
                <span> {downloadTime}</span>
            </div>
            {lastMod && (
                <div className={styles.item}>
                    <span>Last modified: </span>
                    {lastMod}
                    <span> {modifiedTime}</span>
                </div>
            )}
            <div className={styles.item}>
                <span>Content-Type: {data.headers['content-type'] || 'Unknown'}</span>
            </div>
            <div className={styles.item}>
                <span>Size: {data.size}</span>
            </div>
            <Headers data={data} />
            <FilePreview data={data} />
            {/* <pre><code>{JSON.stringify(data, undefined, 2)}</code></pre> */}
        </li>
    );
};

File.propTypes = {
    data: PropTypes.object.isRequired,
}

export default File;
