import { formatTimeDifference } from "../commonFunctions";
import up from '../assets/up.png'
import down from '../assets/down.png'
import comment from '../assets/comment.png'

const Comment = (props) => {
    const profilePic = props.profilePic;
    const username = props.username;
    const comment = props.comment;
    const time = formatTimeDifference(props.time);
    const upVotes = props.upVotes;
    const downVotes = props.downVotes;
    const noOfComments = props.noOfComments;

    const handleUpvote = () => {

    }

    const handleDownvote = () => {

    }

    return (
        <div className="flex flex-col border-b-solid border-b-2 border-b-gray-900">
            <div className="flex gap-2">
                <img src={profilePic} className="rounded-full object-cover" width={'30px'} height={'30px'} alt="pp" />
                <p>{username}</p>
            </div>
            <p>{comment}</p>
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleUpvote} src={up} alt="pp" />
                    <span>{upVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleDownvote} src={down} alt="pp" />
                    <span>{downVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" src={comment} alt="pp" />
                    <span>{noOfComments}</span>
                </div>
                <span>{time}</span>
            </div>
        </div>
    )
}

export default Comment;