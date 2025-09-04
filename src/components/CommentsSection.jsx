import { deleteComment, getComments, getUserByUsername } from "../../api";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import CommentForm from "./CommentForm";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLoggedInUser } from "../Contexts/LoggedInUserContext";

export default function CommentsSection({ articleId }) {
    const [comments, setComments] = useState([]);
    const [avatars, setAvatars] = useState({});
    const { loggedInUser } = useLoggedInUser();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();
    const commentIds = useRef(new Set());

    const lastCommentRef = useCallback((node) => {
        if (isLoading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        getComments(articleId, page, 10).then(newComments => {
            const uniqueNewComments = newComments.filter(c => !commentIds.current.has(c.comment_id));
            uniqueNewComments.forEach(c => commentIds.current.add(c.comment_id));
            setComments(prev => [...prev, ...uniqueNewComments]);
            setHasMore(newComments.length === 10);
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [articleId, page]);

    useEffect(() => {
        if (!comments.length) return;

        const uniqueAuthors = [...new Set(comments.map(comment => comment.author).filter(Boolean))];

        uniqueAuthors.forEach(author => {
            if (!author || avatars[author]) return;

            getUserByUsername(author).then(user => {setAvatars(prev => ({...prev, [author]: user.avatar_url}))})
            .catch(err => {
                console.log(`Failed to fetch avatar for ${author}:`, err)
            });
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
        <section style={{minHeight: "100vh", minWidth: "100vw", position: "relative"}}>
                <>
                    <CommentForm articleId={articleId} setComments={setComments} />
                    <h4 style={{marginLeft: "1.5vw"}}>Comments:</h4>
                    {error && <p>{error.msg}</p>}
                    {!comments.length && !isLoading && <p style={{ marginLeft: "1vw" }}>No comments yet.</p>}
                    <ul id="comments-list">
                        {comments.map((comment, index) => {
                            const isLast = index === comments.length - 1;
                            return (
                                <li key={comment.comment_id} ref={isLast ? lastCommentRef : null}>
                                    <CommentCard comment={comment} avatarUrl={avatars[comment.author]} canDelete={comment.author === loggedInUser} onDelete={() => handleDelete(comment.comment_id)} />
                                </li>
                            )   
                        })}
                    </ul>
                    {hasMore && !isLoading && <Loading/>}
                </>
        </section>
    )
}