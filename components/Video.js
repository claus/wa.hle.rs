import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'

import styles from './Video.module.scss';

const Video = ({ video }) => {
    const [publishTime, setPublishTime] = useState(null);
    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(() => {
            setPublishTime('Published: ' + formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true }));
        }, 1000);
        return () => {
            clearInterval(interval.current);
        }
    }, [video])

    const { url, height, width } = video.thumbnails.default;

    return (
        <li className={styles.root}>
            <a className={styles.thumbnail} href={`https://www.youtube.com/watch?v=${video.id}`}>
                <img className={styles.image} src={url} width={width} height={height} />
            </a>
            <div className={styles.metadata}>
                <div className={styles.title}>{video.title}</div>
                {video.description && <div>{video.description}</div>}
                {video.archive && video.archive.map((archived, i) => {
                    return (
                        <div key={i}>
                            <span>Download: </span>
                            <a className={styles.download} href={`https://father.codeazur.com.br/videos/${archived.name}`}>
                                {archived.title || archived.name}
                            </a>
                        </div>
                    );
                })}
                <div>{publishTime}</div>
            </div>
        </li>
    );
};

Video.propTypes = {
    video: PropTypes.object.isRequired,
}

export default Video;
