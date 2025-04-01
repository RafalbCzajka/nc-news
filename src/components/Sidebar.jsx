import SidebarButton from "./SidebarButton"
import { useState, useEffect } from "react";
import { getTopics } from "../../api";
import { useSidebar } from "../Contexts/SidebarContext";
import useApiRequest from "../hooks/useApiRequest"
import Loading from "./Loading";

export default function Sidebar() {
    const {isSidebarOpen} = useSidebar();
    const {data: topics, isLoading, error} = useApiRequest(getTopics);

    return (
        <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            {isLoading && <Loading/>}
            {error && <p>{error.msg}</p>}
            <ul>
                {topics.map((topic) => (
                    <SidebarButton key={topic.slug} topic={topic} />
                ))}
            </ul>
        </aside>
    )
}