export default function ToggleSidebar() {
    return (
        <section>
            <input type="checkbox" id="toggle-sidebar" />
            <label htmlFor="toggle-sidebar" class="toggle">
                <div class="bars" id="bar1"></div>
                <div class="bars" id="bar2"></div>
                <div class="bars" id="bar3"></div>
            </label>
        </section>
        
    )
}