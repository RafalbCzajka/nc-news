import { useTheme } from "../Contexts/ThemeContext"

export default function ToggleTheme() {
    const {isDarkTheme, setTheme} = useTheme();
    return (
        <div id="toggle-theme">
        <label className="switch-label" title="Toggle light/dark theme">
            <input type="checkbox" className="checkbox"  aria-label="Toggle light or dark theme" checked={!isDarkTheme} onChange={() => setTheme(prev => !prev)}/>
                <span className="slider"></span>
        </label>
    </div>
    )
}