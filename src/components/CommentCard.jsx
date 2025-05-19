import { useState } from "react";
import { updateCommentVote } from "../../api";

export default function CommentCard({comment, avatarUrl, canDelete, onDelete}) {
    const formattedDate = new Date(comment.created_at).toLocaleDateString("en-GB");
    const [votes, setVotes] = useState(comment.votes);
    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = async (voteType) => {
        if (hasVoted) return;

        const voteChange = voteType === 'up' ? 1 : -1;
        setVotes((curr) => curr + voteChange);
        setHasVoted(true);

        try{
            await updateCommentVote(comment.comment_id, voteType);
        } catch (err) {
            setVotes((curr) => curr - voteChange);
            setHasVoted(false);
            alert("Failed to vote. Please try again.");
        }
    }

    return (
        <li className="comment-card">
            <div className="comment-left">
                <p>{comment.author}</p>
                {avatarUrl && (
                    <img src={avatarUrl} alt={`${comment.author}'s avatar`} className="comment-avatar"/>
                )}
            </div>
            <p className="comment-center">{comment.body}</p>
            <p className="comment-right">{formattedDate}</p>
            <p className="comment-right">Votes: {votes}</p>
            {!canDelete && (
                <div>
                    <button className="upvote-button" onClick={() => handleVote('up')} disabled={hasVoted}>+1</button>
                    <button className="downvote-button" onClick={() => handleVote('down')} disabled={hasVoted}>-1</button>
                </div>
            )}
            {canDelete && (
                <button onClick={onDelete} className="comment-delete-button">Delete</button>
            )}
        </li>
    )
}