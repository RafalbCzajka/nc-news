import SidebarButton from "./SidebarButton"
import { getTopics } from "../../api";
import { useSidebar } from "../Contexts/SidebarContext";
import useApiRequest from "../hooks/useApiRequest"
import Loading from "./Loading";
import { useNavigate } from "react-router";

export default function Sidebar() {
    const {isSidebarOpen} = useSidebar();
    const {data: topics, isLoading, error} = useApiRequest(getTopics);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

    return (
        <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            {isLoading && <Loading/>}
            {error && <p>{error.msg}</p>}
            <h3>Topics:</h3>
            <ul>
                <li><button onClick={handleClick}>All articles</button></li>
                {topics.map((topic) => (
                    <SidebarButton key={topic.slug} topic={topic} />
                ))}
            </ul>
        </aside>
    )
}