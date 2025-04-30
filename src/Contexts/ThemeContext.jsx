import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [isDarkTheme, setTheme] = useState(true);

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
      }, [isDarkTheme]);

    return (
        <ThemeContext.Provider value={{selectedTheme: isDarkTheme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}