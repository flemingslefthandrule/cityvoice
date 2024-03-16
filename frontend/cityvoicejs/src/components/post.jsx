import { useState } from "react";
import Dummy from '../assets/Dummy.png'
import up from '../assets/up.png'
import down from '../assets/down.png'
import comment from '../assets/comment.png'


const Post = (props) => {
    const postData = props.postData;
    const profilePic = props.profilePic;
    const username = props.username;
    const time = postData.created_at;
    const title = postData.title;
    const body = postData.body;
    const upVotes = postData.upvotes;
    const downVotes = postData.downvotes;
    const label = postData.label.name;

    const handleUpvote = () => {
        
    }

    const handleDownvote = () => {
        
    }

    return (
        <div className="flex flex-col w-full bg-gray-700 rounded-md overflow-hidden  my-2">
            <div className="w-full flex gap-2 p-2 bg-gray-600">
                <img src={profilePic} width={'30px'} height={'30px'} alt="pp" className='rounded-full object-cover' />
                <p className='flex-1 self-center'>{username}</p>
                <span className="self-center">{time}</span>
            </div>
            <div className="p-2 w-full flex gap-2 p-2 bg-gray-700 flex flex-col">
                <p className="font-bold text-3xl">{title}</p>
                <p className="text-lg">{body}</p>
                <div className="flex gap-3 items-center">
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleUpvote} src={up} alt="pp" />
                    <span>{upVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" onClick={handleDownvote} src={down} alt="pp" />
                    <span>{downVotes}</span>
                    <img className="w-[15px] h-[15px] cursor-pointer" src={comment} alt="pp" />
                    <span>0</span>
                    {label && <span>{label}</span>}
                </div>
            </div>
        </div>
    )
}

export default Post