import { useParams } from "react-router-dom";
import LeftHome from "../components/leftHome";
import RightHome from "../components/rightHome";


const FullPost = () => {

    const params = useParams();

    return (
        <div className='h-[100vh] w-[100vw] flex'>
            <LeftHome />
            <div className="h-[100vh] w-[60%] flex flex-col space-y-2 overflow-auto">
                FullPost
                {params.postid}
            </div>
            <RightHome />
        </div>
    );
}

export default FullPost;
