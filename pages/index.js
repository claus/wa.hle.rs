import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { lightFormat } from 'date-fns';
import { loadDigest } from 'utils';

import SectionChannel from 'components/SectionChannel';
import SectionWebsite from 'components/SectionWebsite';

import styles from './index.module.scss';

const LOAD_INTERVAL = 15 * 60 * 1000;

const Landing = ({ digest: initialDigest, channel: initialChannel }) => {
    const loadInterval = useRef();
    const updateInterval = useRef();
    const [lastLoad, setLastLoad] = useState(Date.now());
    const [countdownLoad, setCountdownLoad] = useState('Updating in');
    const [isUpdating, setIsUpdating] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);
    const [digest, setDigest] = useState(initialDigest)
    const [channel, setChannel] = useState(initialChannel)

    const update = async () => {
        setIsUpdating(true);
        const { digest, channel } = await loadDigest();
        setDigest(digest);
        setChannel(channel);
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
            <SectionChannel channel={channel} />
            <SectionWebsite digest={digest} />
        </main>
    );
};

export async function getServerSideProps() {
    const initialDigest = await loadDigest();
    return {
        props: { ...initialDigest },
    };
}

Landing.propTypes = {
    digest: PropTypes.array.isRequired,
    channel: PropTypes.array.isRequired,
}

export default Landing;
