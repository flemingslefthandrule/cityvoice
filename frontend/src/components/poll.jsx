import React from 'react';
import Dummy from "../assets/Dummy.png";
import up from "../assets/up.png";
import down from "../assets/down.png";
import comment from "../assets/comment.png";
import { useNavigate } from 'react-router-dom'
import { formatTimeDifference } from '../commonFunctions'


const Poll = (props) => {

    const postData = props.postData || {
        created_at:"5 min ago",
        title:"Title or question of the poll",
        options:['option 1', 'option 2', 'option 3'],
        upvotes:0,
        downvotes:0
    };
    const navigate = useNavigate();
    const profilePic = props.profilePic || Dummy;
    const username = props.username || "Nikhil";
    const time = formatTimeDifference(postData.created_at);
    const title = postData.title;
    const options = postData.options;
    const upVotes = postData.upvotes;
    const downVotes = postData.downvotes;

    const handleUpvote = () => {
        
    }

    const handleDownvote = () => {
        
    }

    return (
        <div className="flex flex-col w-full bg-gray-700 rounded-md overflow-hidden">
            <div className="w-full flex gap-2 p-2 bg-gray-600">
                <img src={profilePic} width={'30px'} height={'30px'} alt="pp" className='rounded-full object-cover' />
                <p className='flex-1 self-center cursor-pointer' onClick={() => {navigate("/profile/"+username)}}>{username}</p>
                <span className="self-center">{time}</span>
            </div>
            <div className="p-2 w-full flex gap-2 p-2 bg-gray-700 flex flex-col">
                <p className="font-bold text-3xl">{title}</p>
                <div className="flex flex-col">
                    {options.map((opt, index) => (
                        <div key={index} className="flex gap-2">
                            <input type="radio" name={index} />
                            <span>{opt}</span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-3 items-center">
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleUpvote} src={up} alt="pp" />
                    <span>{upVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleDownvote} src={down} alt="pp" />
                    <span>{downVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" src={comment} alt="pp" />
                    <span>0</span>
                </div>
            </div>
        </div>
    )
}

export default Poll;
