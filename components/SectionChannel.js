import React from 'react';
import PropTypes from 'prop-types';

import Video from 'components/Video';

import styles from './SectionWebsite.module.scss';

const SectionChannel = ({ channel }) => {
    return (
        <div className={styles.root}>
            <h2>YouTube Channel</h2>
            <p><a href="https://www.youtube.com/channel/UCyNdgFWM5P7iNL11UOQtahw">https://www.youtube.com/channel/UCyNdgFWM5P7iNL11UOQtahw</a></p>
            <ul className={styles.list}>
                {channel.map(video => <Video key={video.id} video={video} />)}
            </ul>
        </div>
    );
};

SectionChannel.propTypes = {
    channel: PropTypes.array.isRequired,
}

export default SectionChannel;
