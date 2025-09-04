import { getArticle } from "../../api";
import { useLoggedInUser } from "../Contexts/LoggedInUserContext";
import useApiRequest from "../hooks/useApiRequest";
import DetailedArticleSkeleton from "./DetailedArticleSkeleton"
import VoteOnArticle from "./VoteOnArticle";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function DetailedArticleCard({articleId, onDelete}) {
    const {data: article, isLoading, error} = useApiRequest(getArticle, articleId);
    const [votes, setVotes] = useState(0);
    const formattedDate = new Date(article.created_at).toLocaleDateString("en-GB")
    const navigate = useNavigate();
    const {loggedInUser} = useLoggedInUser();

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
    
    if (error) {
        return (<p>{error.msg}</p>)
    }

    return (
        <>
        {isLoading ? (
            <DetailedArticleSkeleton/>
        ) : (
            <section className="detailed-article-card">
                <h2>{article.title}</h2>
                <p className="font-body">By {article.author}</p>
                <p className="font-body">Topic: {article.topic}</p>
                <p className="font-body">{formattedDate}</p>
                <img src={article.article_img_url}/>
                <p className="font-body">{article.body}</p>
                <p className="article-right">Votes: {votes}</p>
                <VoteOnArticle articleId={article.article_id} votes={votes} setVotes={setVotes}/>
                {loggedInUser === article.author && (
                    <button className="article-delete-button" onClick={onDelete}>Delete Article</button>
                )}
                </section>
            )}
        </>
    )
}