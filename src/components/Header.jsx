import ToggleSidebar from "./ToggleSidebar"
import ToggleTheme from "./ToggleTheme"
import { Link } from "react-router"

export default function Header() {
    return (
        <header>
            <ToggleSidebar/>
            <Link to="/"><h1>NC News</h1></Link>
            <ToggleTheme/>
        </header>
    )
}