import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setTheme] = useState(prefersDark);

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = (e) => (e.matches);
        mediaQuery.addEventListener("change", listener);

        return () => mediaQuery.removeEventListener("change", listener);
      }, [isDarkTheme]);

    return (
        <ThemeContext.Provider value={{isDarkTheme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}