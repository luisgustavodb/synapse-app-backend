import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (currentTheme: Theme) => {
            if (currentTheme === 'dark' || (currentTheme === 'system' && systemPrefersDark.matches)) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme(theme);

        // This listener handles the case where the user has "system" theme selected
        // and their OS theme changes.
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                if (e.matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        systemPrefersDark.addEventListener('change', handleSystemThemeChange);

        return () => {
            systemPrefersDark.removeEventListener('change', handleSystemThemeChange);
        };
    }, [theme]); // Re-run this effect whenever the theme state changes

    const changeTheme = useCallback((newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }, []);

    const value = useMemo(() => ({ theme, changeTheme }), [theme, changeTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};