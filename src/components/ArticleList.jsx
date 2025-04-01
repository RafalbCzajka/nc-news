import { getArticles } from "../../api"
import useApiRequest from "../hooks/useApiRequest"
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

export default function ArticleList() {
    const {data: articles, isLoading, error} = useApiRequest(getArticles);

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