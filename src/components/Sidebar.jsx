import SidebarButton from "./SidebarButton"
import { useState, useEffect } from "react";
import { getTopics } from "../../api";
import { useSidebar } from "../Contexts/SidebarContext";

export default function Sidebar() {
    const {isSidebarOpen} = useSidebar();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics()
            .then((topics) => {
                setTopics(topics);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <ul>
                {topics.map((topic) => (
                    <SidebarButton key={topic.slug} topic={topic} />
                ))}
            </ul>
        </aside>
    )
}