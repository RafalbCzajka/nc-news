import SidebarButton from "./SidebarButton"
import { getTopics } from "../../api";
import { useSidebar } from "../Contexts/SidebarContext";
import useApiRequest from "../hooks/useApiRequest"
import { useNavigate } from "react-router";
import Modal from "react-modal";
import PostArticleModal from "./PostArticleModal";

Modal.setAppElement("#root");

export default function Sidebar() {
    const {isSidebarOpen, setIsSidebarOpen} = useSidebar();
    const {data: topics, isLoading, error} = useApiRequest(getTopics);

    const navigate = useNavigate();
    const handleClick = () => {
        setIsSidebarOpen(false);
        navigate("/");
    }

    return (
        <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.msg}</p>}
            <PostArticleModal/>
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