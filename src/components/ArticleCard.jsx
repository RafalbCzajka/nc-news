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
            <p>By {article.author}</p>
            <img src={article.article_img_url}/>
            <p>Topic: {article.topic}</p>
            <p>{formattedDate}</p>
            <p>Votes: {article.votes}</p>
        </li>
    )
}