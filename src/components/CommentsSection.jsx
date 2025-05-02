import { deleteComment, getComments, getUserByUsername } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import { useLoggedInUser } from "../Contexts/LoggedInUserContext";

export default function CommentsSection({ articleId }) {
    const { data: initialComments, isLoading, error } = useApiRequest(getComments, articleId);
    const [comments, setComments] = useState([]);
    const [avatars, setAvatars] = useState({});
    const { loggedInUser } = useLoggedInUser();

    useEffect(() => {
        if (initialComments) {
            setComments(initialComments);
        }
    }, [initialComments])

    useEffect(() => {
        if (!comments.length) return;

        const uniqueAuthors = [...new Set(initialComments.map(comment => comment.author))];

        uniqueAuthors.forEach(author => {
            if (!avatars[author]) {
                getUserByUsername(author).then(user => {setAvatars(prev => ({...prev, [author]: user.avatar_url}))})
                .catch(err => {
                    console.log(`Failed to fetch avatar for ${author}:`, err)
                });
            }
        })
    }, [comments]);


    const handleDelete = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }
        const previousComments = [...comments];
        setComments((prevComments) => prevComments.filter(comment => comment.comment_id !== commentId));

        try {
            await deleteComment(commentId);
        } catch (err) {
            console.log(err);
            alert("Error deleting comment, please try again.");
            setComments(previousComments);
        }
    }

    return (
        <section>
            <CommentForm articleId={articleId} setComments={setComments} />
            <h4>Comments:</h4>
            {isLoading && <Loading />}
            {error && <p>{error.msg}</p>}
            <ul id="comments-list">
                {comments.map((comment) => (
                    <CommentCard key={comment.comment_id} comment={comment} avatarUrl={avatars[comment.author]} canDelete={comment.author === loggedInUser} onDelete={() => handleDelete(comment.comment_id)} />
                ))}
            </ul>
        </section>
    )
}