import { getComments } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import CommentCard from "./CommentCard";
import Loading from "./Loading";

export default function CommentsSection({articleId}) {
    const {data: comments, isLoading, error} = useApiRequest(getComments, articleId);
    return(
        <section>
            <h4>Comments:</h4>
            {isLoading && <Loading/>}
            {error && <p>{error.msg}</p>}
            <ul id="comments-list">
                {comments.map((comment) => (
                    <CommentCard key={comment.comment_id} comment={comment}/>
                ))}
            </ul>
        </section>
    )
}