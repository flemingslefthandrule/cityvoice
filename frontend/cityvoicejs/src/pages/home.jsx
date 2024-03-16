import React, { useState } from 'react'
import RightHome from '../components/rightHome';
import MiddleHome from '../components/middleHome';
import LeftHome from '../components/leftHome';

const Home = () => {

    const [whichFeed, setFeed] = useState("following");
    
    return (
        <div className='h-[100vh] w-[100vw] flex'>
            <LeftHome setFeed = { setFeed }/>
            <MiddleHome whichFeed = { whichFeed } />
            <RightHome />
        </div>
    )
}

export default Home