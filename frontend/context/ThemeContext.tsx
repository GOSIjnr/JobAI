'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('jobmatch-theme') as Theme | null;
        if (stored) {
            setTheme(stored);
        }
        // Default to dark - no system preference check for premium feel
    }, []);

    useEffect(() => {
        if (mounted) {
            const root = document.documentElement;
            root.classList.remove('dark', 'light');
            root.classList.add(theme);
            localStorage.setItem('jobmatch-theme', theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) {
        return <div className="min-h-screen bg-[#09090b]" />;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
