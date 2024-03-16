import { useEffect, useState } from "react"
import LeftHome from "../components/leftHome"
import RightHome from "../components/rightHome"
import MiddleHome from "../components/middleHome"


const Following = () => {

    return (
        <div className='h-[100vh] w-[100vw] flex'>
            <LeftHome/>
            <div className="middle h-[100vh] w-[60%] p-2 flex flex-col bg-gray-900 overflow-auto rounded-3xl">
                <MiddleHome />
                <div className="h-[100vh] w-[60%] flex flex-col space-y-2 overflow-auto">
                    LocalFeed
                </div>
            </div>
            <RightHome />
        </div>
    )
}

export default Following