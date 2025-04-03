import { useNavigate } from "react-router";

export default function SidebarButton({topic}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/?topic=${topic.slug}`);
    }

    return (
        <li><button onClick={handleClick}>{topic.slug}</button></li>
    )
}