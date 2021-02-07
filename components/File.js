import React from 'react';
import PropTypes from 'prop-types';

const File = ({ data }) => {
    return (
        <li>
            <pre><code>{JSON.stringify(data, undefined, 2)}</code></pre>
        </li>
    );
};

File.propTypes = {
    data: PropTypes.object.isRequired,
}

export default File;
