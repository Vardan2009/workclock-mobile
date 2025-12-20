import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "./themes";

import { saveTheme, loadTheme } from "./storage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [themeName, setThemeName] = useState("light");

    useEffect(() => {
        loadTheme().then((storedTheme) => {
            if (storedTheme) setThemeName(storedTheme);
        });
        return undefined;
    }, []);

    const setTheme = (newName) => {
        setThemeName(newName);
        saveTheme(newName);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: themes[themeName],
                themeName,
                setThemeName: setTheme,
                themeNames: Object.keys(themes),
                themeEmojis: Object.values(themes).map((theme) => theme.emoji),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
