import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Headers.module.scss';

const Headers = ({ data }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggleClick = () => {
        setExpanded(!expanded);
    };

    const headers = Object.entries(data.headers).map(([key, value], i) => {
        return (
            <li className={styles.headerItem} key={i}>
                <span className={styles.headerName}>{key}</span>
                {': '}
                <span className={styles.headerValue}>{value}</span>
            </li>
        );
    });

    const buttonClass = cx(styles.button, {
        [styles.expanded]: expanded,
    });

    return (
        <div className={styles.root}>
            <button className={styles.toggle} onClick={handleToggleClick}>
                <span className={styles.text}>Headers</span>
                <span className={buttonClass}>▶</span>
            </button>
            {expanded && <ul className={styles.headerList}>{headers}</ul>}
        </div>
    );
};

Headers.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Headers;
