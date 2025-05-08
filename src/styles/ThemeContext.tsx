import React, { createContext, useContext } from 'react';
import { carbonBlackTheme } from './colors';

const ThemeContext = createContext(carbonBlackTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeContext.Provider value={carbonBlackTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
