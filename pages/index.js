import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import File from 'components/File';

import styles from './index.module.scss';

const Landing = ({ digest }) => {
    return (
        <main>
            <h1>Father</h1>
            <ul className={styles.list}>
                {digest.map(data => <File key={data.sha256} data={data} />)}
            </ul>
        </main>
    );
};

export async function getServerSideProps() {
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
        }))
    return {
        props: { digest },
    };
}

Landing.propTypes = {
    digest: PropTypes.array.isRequired,
}

export default Landing;
