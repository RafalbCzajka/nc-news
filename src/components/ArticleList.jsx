import { getAllArticles} from "../../api"
import useApiRequest from "../hooks/useApiRequest"
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import { useSearchParams } from "react-router";

export default function ArticleList() {
    const [searchParams] = useSearchParams();
    const topic = searchParams.get("topic");

    const {data: articles, isLoading, error} = useApiRequest(getAllArticles, [topic]);

    return (
        <section id="article-list">
            {isLoading && <Loading/>}
            {error && <p>{error.msg}</p>}
            {articles?.length === 0 && !isLoading && <p>No articles found for this topic.</p>}
            <ul>
                {articles.map((article) => (
                    <ArticleCard key={article.article_id} article={article}/>
                ))}
            </ul>
        </section>
    )
}