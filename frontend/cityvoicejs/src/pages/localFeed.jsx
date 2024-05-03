import { useEffect, useState } from "react"
import LeftHome from "../components/leftHome"
import RightHome from "../components/rightHome"
import MiddleHome from "../components/middleHome"
import axios from "../axios/axios"
import Dummy from '../assets/Dummy.png'
import Post from "../components/post"


const LocalFeed = () => {

    const [posts, setPosts] = useState([])
    const [profilePic, setProfilePic] = useState(Dummy)


    useEffect(()=>{
        axios.get('/post/localfeed/')
        .then((response) => {
            console.log(response.data)
            setPosts(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    return (
        <div className='h-[100vh] w-[100vw] flex'>
            <LeftHome />
            <div className="middle min-h-[100vh] w-[60%] p-2 flex flex-col gap-2 bg-gray-900 overflow-auto scrollbar-hide rounded-3xl">
                <MiddleHome />
                <div className="flex flex-col space-y-2 p-2">
                    {posts && posts.map((eachPost, index) => (
                        <Post key={index} postData={eachPost} username={eachPost.postid.split('-')[0]} profilePic={profilePic} />
                    ))}
                </div>
            </div>
            <RightHome />
        </div>
    )
}

export default LocalFeed