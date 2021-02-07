import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { formatDistance, lightFormat } from 'date-fns';
import { loadDigest, formatNumber } from 'utils';

import File from 'components/File';

import styles from './index.module.scss';

const LOAD_INTERVAL = 15 * 60 * 1000;

const Landing = ({ initialDigest }) => {
    const loadInterval = useRef();
    const updateInterval = useRef();
    const [lastLoad, setLastLoad] = useState(Date.now());
    const [countdownLoad, setCountdownLoad] = useState('Updating in');
    const [isUpdating, setIsUpdating] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);
    const [digest, setDigest] = useState(initialDigest)

    const update = async () => {
        setIsUpdating(true);
        setDigest(await loadDigest());
        setLastLoad(Date.now());
        setIsUpdating(false);
    }

    useEffect(() => {
        setLastLoad(Date.now());
        setCountdownLoad('Updating in');
        loadInterval.current = setInterval(update, LOAD_INTERVAL);
        return () => {
            clearInterval(loadInterval.current);
        }
    }, [forceUpdate]);

    useEffect(() => {
        const setCountdownMessage = () => {
            const msLeft = Math.max(-(Date.now() - lastLoad - LOAD_INTERVAL), 0);
            const distance = lightFormat(new Date(msLeft), 'm:ss');
            setCountdownLoad(`Updating in ${distance}`);
        }
        setCountdownMessage();
        updateInterval.current = setInterval(setCountdownMessage, 1000);
        return () => {
            clearInterval(updateInterval.current);
        }
    }, [lastLoad]);

    const handleUpdateNowClick = () => {
        update();
        setForceUpdate(forceUpdate + 1);
    }

    const countdownMessage = isUpdating ? 'Updating now...' : countdownLoad;

    const updateButtonClass = cx(styles.updateButton, {
        [styles.disabled]: isUpdating,
    });

    return (
        <main>
            <h1>Father Archive</h1>
            <div className={styles.countdownMessage}>{countdownMessage}</div>
            <button className={updateButtonClass} onClick={handleUpdateNowClick}>Update now</button>
            <ul className={styles.list}>
                {digest.map(data => <File key={data.sha256} data={data} />)}
            </ul>
        </main>
    );
};

export async function getServerSideProps() {
    const initialDigest = await loadDigest();
    return {
        props: { initialDigest },
    };
}

Landing.propTypes = {
    initialDigest: PropTypes.array.isRequired,
}

export default Landing;
