import { useContext, useState } from 'react'
import Dummy from '../assets/Dummy.png'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../axios/authProvider';

const LeftHome = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const [myProfilePic, setMyProfilePic] = useState(Dummy);
    const myUserName = (auth && auth.username) || null;

    // if(localStorage.getItem('photo')) {
    //     setMyProfilePic(localStorage.getItem('photo'))
    // }

    const handleLogout = () => {
        setAuth(null);
        window.location.reload();
    }


    return (
        <div className="w-[20%] h-[100%] flex flex-col p-4 items-center space-y-2">
            <p className="font-bold text-4xl my-4">City Voice</p>
            {myUserName &&
                <div className='flex flex-col space-y-4 w-full'>
                    <div onClick={() => { navigate('/profile/' + myUserName) }} className="mb-2 items-center justify-center w-full flex gap-3 items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-[100px] cursor-pointer">
                        <img className='rounded-full w-[30px] h-[30px]' src={myProfilePic} alt="pp" />
                        <span className='ml-1 text-2xl font-bold'>{myUserName}</span>
                    </div>
                    <div onClick={() => { navigate('/following') }} className='w-full p-2 text-center rounded-[100px] bg-gray-700 hover:bg-gray-600 cursor-pointer'>Following</div>
                </div>
            }
            <div onClick={() => { navigate('/') }} className='w-full p-2 text-center rounded-[100px] bg-gray-700 hover:bg-gray-600 cursor-pointer'>Local Feed</div>
            <div onClick={() => { navigate('/globalFeed') }} className='w-full p-2 text-center rounded-[100px] bg-gray-700 hover:bg-gray-600 cursor-pointer'>Global Feed</div>
            {!myUserName && <><div onClick={() => { navigate("/login") }} className='w-full p-2 text-center rounded-[100px] bg-green-600 font-bold hover:bg-green-700 cursor-pointer'>Log In</div></>}
            {myUserName && <><div className='grow'></div>
            <div onClick={handleLogout} className='w-full p-2 text-center rounded-[100px] bg-red-600 font-bold hover:bg-red-700 cursor-pointer'>Log Out</div></>}
        </div>
    )
}

export default LeftHome