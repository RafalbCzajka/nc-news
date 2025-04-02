
import { useParams } from "react-router";
import DetailedArticleCard from "./DetailedArticleCard";
import CommentsSection from "./CommentsSection";

export default function SingleArticleView() {
const {article_id} = useParams();

    return (
        <main className="content">
            <DetailedArticleCard articleId={article_id}/>
            <CommentsSection articleId={article_id}/>
        </main>
    )
}