import React from 'react';
import PropTypes from 'prop-types';

import styles from './FilePreview.module.scss';

const FilePreview = ({ data }) => {
    const fileName = `${data.sha256}.${data.ext}`;
    const downloadUrl = `https://father.codeazur.com.br/files/${fileName}`;
    if (['jpg', 'jpeg', 'gif', 'png'].includes(data.ext)) {
        return (
            <div className={styles.root}>
                <img className={styles.image} src={downloadUrl} />
            </div>
        );
    }
    if (['mp3', 'wav'].includes(data.ext)) {
        return (
            <div className={styles.root}>
                <audio className={styles.audio} controls src={downloadUrl} />
            </div>
        );
    }
    return null;
};

FilePreview.propTypes = {
    data: PropTypes.object.isRequired,
}

export default FilePreview;
