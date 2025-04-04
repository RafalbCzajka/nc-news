import { useEffect } from "react";
import { getAllArticles} from "../../api"
import useApiRequest from "../hooks/useApiRequest"
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import { useSearchParams, useNavigate } from "react-router";

export default function ArticleList() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const topic = searchParams.get("topic");
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    const {data: articles, isLoading, error} = useApiRequest(getAllArticles, {topic: topic, sort_by: sortBy, order: order});

    useEffect(() => {
        if (!isLoading && articles?.length === 0) {
            navigate("/not-found");
        }
    }, [isLoading, articles, navigate])

    return (
        <section id="article-list">
            {isLoading && <Loading/>}
            {error && <p>{error.msg}</p>}
            <ul>
                {articles.map((article) => (
                    <ArticleCard key={article.article_id} article={article}/>
                ))}
            </ul>
        </section>
    )
}