import React from 'react';
import PropTypes from 'prop-types';

import File from 'components/File';

import styles from './SectionWebsite.module.scss';

const SectionWebsite = ({ digest }) => {
    return (
        <div className={styles.root}>
            <h2>Website</h2>
            <p><a href="http://gameportal.gq/">http://gameportal.gq/</a></p>
            <ul className={styles.list}>
                {digest.map(data => <File key={data.sha256} data={data} />)}
            </ul>
        </div>
    );
};

SectionWebsite.propTypes = {
    digest: PropTypes.array.isRequired,
}

export default SectionWebsite;
