import { useParams } from "react-router-dom";
import LeftHome from "../components/leftHome";
import RightHome from "../components/rightHome";
import { useEffect, useState } from "react";
import axios from "../axios/axios";
import Dummy from '../assets/Dummy.png'
import Post from "../components/post";
import Comment from "../components/comment";


const FullPost = () => {

    const params = useParams();
    const postId = params.postid;
    const [postData, setPostData] = useState({postid: postId});
    const [profilePic, setProfilePic] = useState(Dummy);
    const [myComment, setMyComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('/post/'+postId+'/')
        .then((resp) => {
            setPostData(prev => ({
                ...prev,
                ...resp.data
            }));
        })
    },[]);

    const handleSubmit = () => {
        console.log(myComment);

        setMyComment('');
    }

    
    return (
        <div className='h-[100vh] w-[100vw] flex'>
            <LeftHome />
            <div className="middle h-[100vh] w-[60%] p-2 flex flex-col bg-gray-900 rounded-3xl">
                <Post postData={postData} username={postData.postid.split('-')[0]} profilePic={profilePic}/>
                <div className="flex p-2 gap-2">
                    <input className="rounded-[100px] px-4 py-2 w-full bg-gray-700 focus:outline-none grow" type="text" name="myComment" placeholder="Add your comment" value={myComment} onChange={(e)=>{setMyComment(e.target.value)}} onKeyDown={(e)=>{if(e.code=="Enter"){handleSubmit();}}}/>
                    <button className="rounded-[100px] px-4 py-2 grow bg-gray-500" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="flex flex-col p-2 grow bg-gray-600 rounded-xl overflow-auto">
                    {comments && comments.map((item, index) => (
                        <Comment key={index} username={item.username} comment={item.body} time={item.created_at} profilePic={item.profilePic || Dummy} upVotes={item.upvotes} downVotes={item.downvotes} noOfComments={item.noOfComments||0} />
                    ))}
                </div>
            </div>
            <RightHome />
        </div>
    );
}

export default FullPost;
