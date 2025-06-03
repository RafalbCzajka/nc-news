
import { useNavigate, useParams } from "react-router";
import DetailedArticleCard from "./DetailedArticleCard";
import CommentsSection from "./CommentsSection";
import { deleteArticle } from "../../api";

export default function SingleArticleView() {
const {article_id} = useParams();
const navigate = useNavigate();

const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
        await deleteArticle(article_id);
        alert("Article deleted.");
        navigate("/");
    } catch (err) {
        alert("Faield to delete article.");
    }
}

    return (
        <main>
            <DetailedArticleCard articleId={article_id} onDelete={handleDelete}/>
            <CommentsSection articleId={article_id}/>
        </main>
    )
}