import { useTheme } from "../Contexts/ThemeContext"

export default function ToggleTheme() {
    const {isDarkTheme, setTheme} = useTheme();
    return (
        <div id="toggle-theme">
        <label className="switch-label">
            <input type="checkbox" className="checkbox" checked={!isDarkTheme} onChange={() => setTheme(prev => !prev)}/>
                <span className="slider"></span>
        </label>
    </div>
    )
}