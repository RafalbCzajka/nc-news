import { deleteComment, getComments } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import { useLoggedInUser } from "../Contexts/LoggedInUserContext";

export default function CommentsSection({articleId}) {
    const {data: initialComments, isLoading, error} = useApiRequest(getComments, articleId);
    const [comments, setComments] = useState([]);
    const {loggedInUser} = useLoggedInUser();

    useEffect(() => {
        if (initialComments) {
            setComments(initialComments);
        }
    }, [initialComments])


    const handleDelete = (commentId) => {
        if(window.confirm("Are you sure you want to delete this comment?")) {
            setComments((prevComments) => prevComments.filter(comment => comment.comment_id !== commentId));

            deleteComment(commentId).then(() => {
                console.log("comment deleted successfully");
            })
            .catch((err) => {
                setComments((prevComments) => [...prevComments]);
                alert("Error deleting comment, please try again.");
            }) 
        }
    }

    return(
        <section>
            <CommentForm articleId={articleId} setComments={setComments}/>
            <h4>Comments:</h4>
            {isLoading && <Loading/>}
            {error && <p>{error.msg}</p>}
            <ul id="comments-list">
                {comments.map((comment) => (
                    <CommentCard key={comment.comment_id} comment={comment} canDelete={comment.author === loggedInUser} onDelete={() => handleDelete(comment.comment_id)}/>
                ))}
            </ul>
        </section>
    )
}