export default function CommentCard({comment, canDelete, onDelete}) {
    const formattedDate = new Date(comment.created_at).toLocaleDateString("en-GB")

    return (
        <li className="comment-card">
            <p className="comment-left">{comment.author}</p>
            <p className="comment-center">{comment.body}</p>
            <p className="comment-right">{formattedDate}</p>
            <p className="comment-right">Votes: {comment.votes}</p>
            {canDelete && (
                <button onClick={onDelete} className="comment-delete-button">Delete</button>
            )}
        </li>
    )
}