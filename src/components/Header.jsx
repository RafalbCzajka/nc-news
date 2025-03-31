import ToggleSidebar from "./ToggleSidebar"
import ToggleTheme from "./ToggleTheme"

export default function Header() {
    return (
        <header>
            <ToggleSidebar/>
            <h1>NC News</h1>
            <ToggleTheme/>
        </header>
    )
}