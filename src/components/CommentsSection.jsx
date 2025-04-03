import { getComments } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";

export default function CommentsSection({articleId}) {
    const {data: initialComments, isLoading, error} = useApiRequest(getComments, articleId);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (initialComments) {
            setComments(initialComments);
        }
    }, [initialComments])

    return(
        <section>
            <CommentForm articleId={articleId} setComments={setComments}/>
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