import ArticleList from "./ArticleList"
import FilterBar from "./FilterBar";
import { useSearchParams } from "react-router"

export default function ArticleListView() {
    const [searchParams] = useSearchParams();
    const topic = searchParams.get("topic");

    return (
        <main>
            <div className="article-header">
                <h2>{topic ? `Articles about ${topic}` : "All Articles"}</h2>
                <FilterBar />
            </div>
            <ArticleList />
        </main>
    )
}