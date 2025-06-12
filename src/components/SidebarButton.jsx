import { useNavigate } from "react-router";
import { useSidebar } from "../Contexts/SidebarContext";

export default function SidebarButton({topic}) {
    const navigate = useNavigate();
    const {setIsSidebarOpen} = useSidebar();

    const handleClick = () => {
        setIsSidebarOpen(false);
        navigate(`/?topic=${topic.slug}`);
    }

    return (
        <li><button onClick={handleClick}>{topic.slug}</button></li>
    )
}