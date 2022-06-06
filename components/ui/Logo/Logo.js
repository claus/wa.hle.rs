import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

const Logo = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="777"
            height="530"
            viewBox="0 0 777 530"
            className={className}
            aria-hidden
        >
            <g>
                <path
                    d="M29.9124,151.5524c-34.2617-34.268-34.5918-89.4956-.7262-123.3576,33.8657-33.8713,89.1013-33.55,123.363.7179,34.2712,34.2681,34.5918,89.4956.7262,123.3576-33.8562,33.8713-89.0918,33.55-123.3536-.7179Z"
                    className={styles.dot}
                />
                <line
                    x1="686"
                    y1="90.2326"
                    x2="444.9209"
                    y2="439.1628"
                    className={styles.line}
                />
                <line
                    x1="384.6512"
                    y1="90.2326"
                    x2="143.5721"
                    y2="439.1628"
                    className={styles.line}
                />
            </g>
        </svg>
    );
};

Logo.propTypes = {
    className: PropTypes.string,
};

export default Logo;
