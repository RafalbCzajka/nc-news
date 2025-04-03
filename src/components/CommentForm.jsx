import { useState, useContext } from "react";
import { postComment } from "../../api";
import { useLoggedInUser } from "../Contexts/LoggedInUserContext";

export default function CommentForm({articleId, setComments}) {
    const [comment, setComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null);
    const {loggedInUser} = useLoggedInUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsPosting(true);
        setError(null);

        const newComment = {
            author: loggedInUser,
            body: comment,
        }

        try {
            const postedComment = await postComment(articleId, comment, loggedInUser).then((res) => {
                setComments((prevComments) => [res, ...prevComments]);
            })
        } catch(err) {
            setError("Failed to post comment, please try again");
            setComment((prevComments) => prevComments.filter(c => c !== newComment));
        } finally {
            setIsPosting(false);
            setComment("");
        }
    }

    return (
        <section className="new-comment-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment-input">Post a new comment</label>
                <textarea id="comment-input" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." required></textarea>
                <button type="submit" disabled={isPosting}>{isPosting ? "Posting..." : "Post Comment"}</button>
                {error && <p>{error}</p>}
            </form>
        </section>
    )
}