// import PropTypes from 'prop-types';
import cx from 'classnames';

import grid from 'styles/modules/grid.module.scss';
import styles from './Footer.module.scss';

const Footer = () => {
    // prettier-ignore
    return (
        <footer className={cx(styles.footer, grid.container)}>
            <div className={styles.links}>
                <a rel="me" href="https://mastodon.com.br/@claus" className={styles.link}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 173.13 185.61" role="img" aria-labelledby="mastodonComBr">
                        <title id="mastodonComBr">@claus@mastodon.com.br</title>
                        <path fill="currentColor" d="M169.45 111.27c-2.55 13.1-22.8 27.42-46.05 30.2-12.13 1.45-24.07 2.78-36.8 2.2a216.17 216.17 0 0 1-37.26-4.98 42.13 42.13 0 0 0 .38 5.77c2.7 20.54 20.38 21.77 37.11 22.35a107.16 107.16 0 0 0 31.94-4.17l.7 15.28s-11.82 6.34-32.87 7.5a137.47 137.47 0 0 1-42.8-4.73C7.39 171.06 1.12 132.25.17 92.87-.13 81.18.05 70.16.05 60.94c0-40.27 26.39-52.07 26.39-52.07C39.74 2.77 62.56.2 86.29 0h.58c23.73.2 46.57 2.76 59.87 8.87 0 0 26.38 11.8 26.38 52.07 0 0 .34 29.7-3.67 50.33" />
                        <path className={styles.mastodon} d="M142 64.06v48.75h-19.3V65.5c0-9.97-4.2-15.04-12.6-15.04-9.28 0-13.93 6-13.93 17.88v25.9h-19.2v-25.9c0-11.87-4.66-17.88-13.94-17.88-8.4 0-12.59 5.06-12.59 15.04v47.32H31.12V64.06q0-14.94 7.64-23.74c5.25-5.86 12.13-8.86 20.68-8.86 9.88 0 17.37 3.8 22.32 11.4l4.8 8.07 4.82-8.07c4.95-7.6 12.43-11.4 22.32-11.4 8.54 0 15.42 3 20.68 8.86q7.64 8.79 7.63 23.74" />
                    </svg>
                </a>
                <a rel="me" href="https://chaos.social/@claus" className={styles.link}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 173.13 185.61" role="img" aria-labelledby="mastodonSocial">
                        <title id="mastodonSocial">@claus@chaos.social</title>
                        <path fill="currentColor" d="M169.45 111.27c-2.55 13.1-22.8 27.42-46.05 30.2-12.13 1.45-24.07 2.78-36.8 2.2a216.17 216.17 0 0 1-37.26-4.98 42.13 42.13 0 0 0 .38 5.77c2.7 20.54 20.38 21.77 37.11 22.35a107.16 107.16 0 0 0 31.94-4.17l.7 15.28s-11.82 6.34-32.87 7.5a137.47 137.47 0 0 1-42.8-4.73C7.39 171.06 1.12 132.25.17 92.87-.13 81.18.05 70.16.05 60.94c0-40.27 26.39-52.07 26.39-52.07C39.74 2.77 62.56.2 86.29 0h.58c23.73.2 46.57 2.76 59.87 8.87 0 0 26.38 11.8 26.38 52.07 0 0 .34 29.7-3.67 50.33" />
                        <path className={styles.mastodon} d="M142 64.06v48.75h-19.3V65.5c0-9.97-4.2-15.04-12.6-15.04-9.28 0-13.93 6-13.93 17.88v25.9h-19.2v-25.9c0-11.87-4.66-17.88-13.94-17.88-8.4 0-12.59 5.06-12.59 15.04v47.32H31.12V64.06q0-14.94 7.64-23.74c5.25-5.86 12.13-8.86 20.68-8.86 9.88 0 17.37 3.8 22.32 11.4l4.8 8.07 4.82-8.07c4.95-7.6 12.43-11.4 22.32-11.4 8.54 0 15.42 3 20.68 8.86q7.64 8.79 7.63 23.74" />
                    </svg>
                </a>
            </div>
        </footer>
    );
};

Footer.propTypes = {};

export default Footer;
