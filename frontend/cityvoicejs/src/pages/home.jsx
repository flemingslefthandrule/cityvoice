import React, { useState } from 'react'
import RightHome from '../components/rightHome';
import MiddleHome from '../components/middleHome';
import LeftHome from '../components/leftHome';

const Home = () => {
    
    return (
        <div className='h-[100vh] w-[100vw] flex'>
            <LeftHome />
            <MiddleHome/>
            <RightHome />
        </div>
    )
}

export default Home