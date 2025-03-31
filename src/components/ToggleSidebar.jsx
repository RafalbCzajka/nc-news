import { useSidebar } from "../Contexts/SidebarContext"

export default function ToggleSidebar() {
    const {setIsSidebarOpen} = useSidebar();
    return (
        <section>
            <input type="checkbox" id="toggle-sidebar" onClick={() => setIsSidebarOpen(prev => !prev)} />
            <label htmlFor="toggle-sidebar" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
            </label>
        </section>
        
    )
}