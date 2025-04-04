import { useParams, useSearchParams } from "react-router"

export default function FilterBar() {
    const [searchParams, setsearchParams] = useSearchParams();

    const handleSortChange = (e) => {
        searchParams.set("sort_by", e.target.value);
        setsearchParams(searchParams);
    }

    const handleOrderChange = (e) => {
        searchParams.set("order", e.target.value);
        setsearchParams(searchParams);
    }

    return(
        <section id="filter-bar">
            <label>
                Sort by: 
                <select value={searchParams.get("sort_by") || "created_at"} onChange={handleSortChange}>
                    <option value="created_at">Date</option>
                    <option value="comment_count">Comment Count</option>
                    <option value="votes">Votes</option>
                </select>
            </label>
            <label>
                Order: 
                <select value={searchParams.get("order") || "desc"} onChange={handleOrderChange}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </label>
        </section>
    )
}