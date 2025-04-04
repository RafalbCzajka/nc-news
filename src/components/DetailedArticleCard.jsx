import { getArticle } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import Loading from "./Loading";
import VoteOnArticle from "./VoteOnArticle";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function DetailedArticleCard({articleId}) {
    const {data: article, isLoading, error} = useApiRequest(getArticle, articleId);
    const [votes, setVotes] = useState(0);
    const formattedDate = new Date(article.created_at).toLocaleDateString("en-GB")
    const navigate = useNavigate();

    useEffect(() => {
        if (article) {
            setVotes(article.votes);
        }
    }, [article]);

    useEffect(() => {
        if (error?.response?.status === 404) {
            navigate("/not-found")
        }
    }, [error, navigate])
    
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
            <p className="article-right">Votes: {votes}</p>
            <VoteOnArticle articleId={article.article_id} votes={votes} setVotes={setVotes}/>
        </section>
    )
}