import { useState } from "react"
import CreatePost from "./createPost"


const MiddleHome = () => {

    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="w-full p-2"> 
            {isCreating ? (
                <CreatePost setIsCreating={setIsCreating} />
            ) : (
                <input className="rounded-[100px] p-2 w-full" onFocus={() => { setIsCreating(true) }} type="text" placeholder="Create a post or a poll" />
            )}
        </div>
    )
}

export default MiddleHome