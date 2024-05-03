import up from '../assets/up.png'
import down from '../assets/down.png'
import comment from '../assets/comment.png'
import { useNavigate } from 'react-router-dom'
import { formatTimeDifference } from '../commonFunctions'


const Post = (props) => {
    const navigate = useNavigate();
    const postData = props.postData;
    const profilePic = props.profilePic;
    const username = props.username;
    // const time = postData.created_at;
    const time = formatTimeDifference(postData.created_at);
    const title = postData.title;
    const body = postData.body;
    const upVotes = postData.upvotes||0;
    const downVotes = postData.downvotes||0;
    const noOfComments = 0;
    // const label = postData.label.name||null;

    const handleUpvote = () => {

    }

    const handleDownvote = () => {

    }

    return (
        <div className="flex flex-col w-full bg-gray-700 rounded-md overflow-hidden">
            <div className="w-full flex gap-2 p-2 bg-gray-600">
                <img src={profilePic} width={'30px'} height={'30px'} alt="pp" className='rounded-full object-cover' />
                <p className='flex-1 self-center cursor-pointer' onClick={() => { navigate("/profile/" + username) }}>{username}</p>
                <span className="self-center">{time}</span>
            </div>
            <div className="p-2 w-full flex gap-2 p-2 bg-gray-700 flex flex-col">
                <p className="font-bold text-3xl cursor-pointer" onClick={() => { navigate("/post/" + postData.postid) }}>{title}</p>
                <p className="text-lg">{body}</p>
                <div className="flex gap-3 items-center">
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleUpvote} src={up} alt="pp" />
                    <span>{upVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleDownvote} src={down} alt="pp" />
                    <span>{downVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" src={comment} alt="pp" />
                    <span>{noOfComments}</span>
                    {/* {label && <span>{label}</span>} */}
                </div>
            </div>
        </div>
    )
}

export default Post