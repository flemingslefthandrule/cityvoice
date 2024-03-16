import { useEffect, useState } from "react"
import CreatePost from "./createPost"
import LocalFeed from "../pages/localFeed";
import Following from "../pages/following";
import GlobalFeed from "../pages/globalFeed";


const MiddleHome = (props) => {

    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="w-full"> 
            {isCreating ? (
                <CreatePost setIsCreating={setIsCreating} />
            ) : (
                <input className="rounded-[100px] p-2 w-full" onFocus={() => { setIsCreating(true) }} type="text" placeholder="Create a post or a poll" />
            )}
        </div>
    )
}

export default MiddleHome