import { getArticle } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import Loading from "./Loading";

export default function DetailedArticleCard({articleId}) {
    const {data: article, isLoading, error} = useApiRequest(getArticle, articleId);
    const formattedDate = new Date(article.created_at).toLocaleDateString("en-GB")

    if (isLoading) {
        return (<Loading/>);
    }
    if (error) {
        return (<p>{error.msg}</p>)
    }

    return (
        <section className="detailed-article-card">
            <h2>{article.title}</h2>
            <p>By {article.author}</p>
            <p>Topic: {article.topic}</p>
            <p>{formattedDate}</p>
            <img src={article.article_img_url}/>
            <p>{article.body}</p>
            <p className="article-right">Votes: {article.votes}</p>
            <p className="article-right">Comments: {article.comment_count}</p>
        </section>
    )
}