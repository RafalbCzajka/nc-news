import { useSidebar } from "../Contexts/SidebarContext"

export default function ToggleSidebar() {
    const {isSidebarOpen, setIsSidebarOpen} = useSidebar();
    return (
        <section title="Toggle sidebar">
            <input type="checkbox" aria-label="Toggle sidebar" id="toggle-sidebar" checked={isSidebarOpen} onChange={() => setIsSidebarOpen(prev => !prev)} />
            <label htmlFor="toggle-sidebar" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
            </label>
        </section>
        
    )
}