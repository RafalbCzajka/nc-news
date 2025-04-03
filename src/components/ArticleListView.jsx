import ArticleList from "./ArticleList"
import { useSearchParams } from "react-router"

export default function ArticleListView() {
    const [searchParams] = useSearchParams();
    const topic = searchParams.get("topic");

    return(
        <main className="content">
            <h2>{topic ? `Articles about ${topic}` : "All Articles"}</h2>
            <ArticleList/>
        </main>
    )
}