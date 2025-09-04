import { useState } from "react";
import { updateVoteCount } from "../../api";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";


export default function VoteOnArticle({articleId, votes, setVotes}) {
    const [voting, setVoting] = useState(false);
    const [error, setError] = useState(null);

    const handleVote = async (voteType) => {
        if (voting) return;

        const voteChange = voteType === 'up' ? 1 : -1;
        setVotes(votes + voteChange);

        setVoting(true);
        try{
            await updateVoteCount(articleId, voteType);
        } catch(err) {
            console.log(err);
            setError({status: 404, msg: "Something went wrong."})
            setVotes(votes);
        } finally {
            setVoting(false);
        }
    }

    return (
        <div className="voting">
            {error && <p>{error.msg}</p>}
            <button className="upvote-button" onClick={() => handleVote('up')} disabled={voting}>{voting ? 'Voting...' : <BiSolidUpvote />}</button>
            <button className="downvote-button" onClick={() => handleVote('down')} disabled={voting}>{voting ? 'Voting...' : <BiSolidDownvote />}</button>
        </div>
    )
}