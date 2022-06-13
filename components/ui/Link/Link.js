import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkNoScroll = ({ children, href }) => (
    <Link scroll={false} href={href}>
        <a>{children}</a>
    </Link>
);

LinkNoScroll.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    passHref: PropTypes.bool,
};

LinkNoScroll.defaultProps = {
    passHref: true,
};

export default LinkNoScroll;
