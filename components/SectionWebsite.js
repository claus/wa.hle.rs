import React from 'react';
import PropTypes from 'prop-types';

import File from 'components/File';

import styles from './SectionWebsite.module.scss';

const SectionWebsite = ({ digest }) => {
    return (
        <div className={styles.root}>
            <h2>Websites</h2>
            <ul className={styles.list}>
                {digest.map(data => <File key={data.key} data={data} />)}
            </ul>
        </div>
    );
};

SectionWebsite.propTypes = {
    digest: PropTypes.array.isRequired,
}

export default SectionWebsite;
