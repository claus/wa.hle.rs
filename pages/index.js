import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { vigeneredHexSolver } from 'utils';

import Head from 'next/head';

import styles from './index.module.scss';

const Landing = () => {
    const input = useRef();
    const [results, setResults] = useState([]);
    const handleSubmit = event => {
        try {
            setResults(vigeneredHexSolver(input.current.value));
        } catch (e) {}
        event.preventDefault();
    };
    return (
        <div className={styles.container}>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>∩∩∩∩∩∩∩∩∩∩∩∩∩</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>∩</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset className={styles.fieldset}>
                        <legend>
                            Please enter Vigenère-encrypted hex code
                        </legend>
                        <div className={styles.inputs}>
                            <textarea
                                name="input"
                                ref={input}
                                className={styles.input}
                                defaultValue="64 48 64 6g 61 47 56 35 4c 33 5h 6q 64 47 39 6g 59 32 68 76 64 57 4g 6m 5o 57 52 33 5e 58 52 6h 5h 58 4s 6j 62 32 56 6c 61 47 39 79 5h 57 35 76 64 32 56 33 64 47 68 6q 63 32 56 6e 61 47 39 6h 62 33 4h 6q 63 6i 64 6e 64 57 35 7h 64 47 56 6o 61 47 39 6j 63 6f 39 31 5h 32 68 30 61 47 56 74"
                            />
                            <input
                                type="submit"
                                name="submit"
                                value="Hack the planet"
                                className={styles.submit}
                            />
                        </div>
                    </fieldset>
                </form>
                <div className={styles.results}>
                    {results.map((result, i) => (
                        <Result key={i} data={result} />
                    ))}
                </div>
            </main>
        </div>
    );
};

const Result = ({ data }) => {
    const rows = data.reduce((a, letters) => Math.max(a, letters.length), 0);
    return (
        <div className={styles.result}>
            <h2 className={styles.headline}>{data.length} letter keys</h2>
            <table className={styles.table}>
                {new Array(rows).fill(0).map((_, i) => (
                    <tr key={i} className={styles.tr}>
                        {data.map((letters, j) => (
                            <td key={j} className={styles.td}>
                                {letters[i] ?? ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
};

Result.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Landing;
