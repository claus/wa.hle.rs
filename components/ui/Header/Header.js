import cx from 'classnames';

import Link from 'components/ui/Link';
import Logo from 'components/ui/Logo';

import grid from 'styles/modules/grid.module.scss';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={cx(styles.headline, grid.container)}>
                <Link href="/">
                    <a className={styles.homepageLink}>
                        <Logo className={styles.logo} />
                        {/* <span className={styles.logoType}>
                            <span className="sr">Claus </span>
                            <span className={styles.dot}>Wa</span>
                            <span className={styles.dot}>hle</span>rs
                        </span> */}
                    </a>
                </Link>
            </h1>
        </header>
    );
};

export default Header;
