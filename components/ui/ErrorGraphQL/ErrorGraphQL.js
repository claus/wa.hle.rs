import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Head from 'components/misc/Head';
import Error from 'components/ui/Error';

import grid from 'styles/modules/grid.module.scss';
import styles from './ErrorGraphQL.module.scss';

const ErrorGraphQL = ({ error }) => {
    if (process.env.NODE_ENV === 'development') {
        const {
            requestType,
            query,
            path,
            locations,
            message = 'Internal Server Error',
        } = error;
        const hasPath = Array.isArray(path) && path?.length > 0;
        const hasLocs = Array.isArray(locations) && locations?.length > 0;
        const errorLines = hasLocs ? locations.map(({ line }) => line) : [];
        return (
            <div className={cx(grid.container, styles.root)}>
                <h1 className={styles.headline}>{message}</h1>
                {requestType && (
                    <div className={styles.requestType}>
                        Request: {requestType}
                    </div>
                )}
                {hasLocs && (
                    <div className={styles.locations}>
                        {locations.map(({ line, column }, i) => (
                            <p key={i}>
                                At line {line}, column {column}
                            </p>
                        ))}
                    </div>
                )}
                {hasPath && (
                    <div className={styles.path}>
                        <p>Path: {path.join(' ➔ ')}</p>
                    </div>
                )}
                {query && (
                    <pre className={styles.graphql}>
                        {query.split('\n').map((line, i) => {
                            const className = cx(styles.code, {
                                [styles.error]: errorLines.includes(i + 1),
                            });
                            return (
                                <code key={i} className={className}>
                                    {line}
                                </code>
                            );
                        })}
                    </pre>
                )}{' '}
            </div>
        );
        return (
            <div>
                <Head title={`500 | Internal Server Error`} />
                {error}
            </div>
        );
    }
    return <Error statusCode={500} message="Internal Server Error" />;
};

ErrorGraphQL.propTypes = {
    query: PropTypes.string,
    message: PropTypes.string,
};

export default ErrorGraphQL;
