import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Claus Wahlers</h1>
            <h2>Keypunch Operations</h2>
        </header>
    );
};

export default Header;
