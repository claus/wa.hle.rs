import { createContext, useState, useEffect } from 'react';

const DARK = 'dark';
const LIGHT = 'light';
const LS_KEY = 'theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeInternal] = useState();

    const setTheme = value => {
        setThemeInternal(value);
        localStorage.setItem(LS_KEY, value);
        document.documentElement.dataset.theme = value;
    };

    useEffect(() => {
        if ('theme' in document.documentElement.dataset) {
            setThemeInternal(document.documentElement.dataset.theme);
        }
        const handleChange = event => {
            const theme = event.matches ? DARK : LIGHT;
            setThemeInternal(theme);
            document.documentElement.dataset.theme = theme;
        };
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        mql.addEventListener('change', handleChange);
        return () => mql.removeEventListener('change', handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const themeScript = `(function() {
    function getTheme() {
        const saved = window.localStorage.getItem('${LS_KEY}');
        if (typeof saved === 'string') return saved;
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        if (typeof mql.matches === 'boolean') return mql.matches ? '${DARK}' : '${LIGHT}';
        return '${DARK}';
    }
    document.documentElement.dataset.theme = getTheme();
})();`;

export const ThemeScript = () => {
    return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};
