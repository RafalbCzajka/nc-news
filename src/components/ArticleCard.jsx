import { useNavigate } from "react-router"

export default function ArticleCard({article}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/articles/${article.article_id}`)
    }

    const formattedDate = new Date(article.created_at).toLocaleDateString("en-GB")
    return (
        <li className="article-card" onClick={handleClick}>
            <h3>{article.title}</h3>
            <p className="font-body">By {article.author}</p>
            <img src={article.article_img_url}/>
            <p className="font-body">Topic: {article.topic}</p>
            <p className="font-body">{formattedDate}</p>
            <p className="font-body">Votes: {article.votes}</p>
            <p className="font-body">{article.comment_count} comments</p>
        </li>
    )
}