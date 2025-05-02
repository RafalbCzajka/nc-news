export default function CommentCard({comment, avatarUrl, canDelete, onDelete}) {
    const formattedDate = new Date(comment.created_at).toLocaleDateString("en-GB")

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
            <p className="comment-right">Votes: {comment.votes}</p>
            {canDelete && (
                <button onClick={onDelete} className="comment-delete-button">Delete</button>
            )}
        </li>
    )
}