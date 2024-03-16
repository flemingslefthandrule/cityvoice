import { Link, useNavigate } from 'react-router-dom'
import Dummy from '../assets/Dummy.png'
import { useState } from 'react'
import axios from '../axios/axios'

const RightHome = () => {

    const navigate = useNavigate()
    const [searchName, setSearchName] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearchChange = (e) => {
        setSearchName(e.target.value)
    }

    const handleSearch = (e) => {
        if(e.code=='Enter') {
            axios.get('/user/whois/'+searchName+'/')
            .then((resp) => {
                setSearchResults(resp.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }

    return (
        <div className="w-[20%] h-[100%] p-2 items-center flex flex-col space-y-2">
            <input className="rounded-[100px] px-4 py-2 w-full bg-gray-700 focus:outline-none" type="text" name='search' id='search' placeholder='Search' onChange={handleSearchChange} onKeyDown={handleSearch} />
            <div className="w-full rounded-xl bg-gray-800 flex flex-col justify-center">
                {searchResults && searchResults.map((user, index) => (
                    <div key={index} onClick={()=>{navigate("/profile/"+user.name)}} className="flex gap-2 p-4 border-b-solid border-b-gray-900 border-b-[2px] cursor-pointer">
                        {user.name ?(
                        <>
                            <img src={user.photo || Dummy} alt="" className="w-[1.5em] rounded-[50%]"/>
                            {user.name}
                        </> 
                        ):(
                            <>
                                {user.err}
                            </> 
                        )}
                    </div>
                ))}
                {(searchResults.length>0) && <div className='flex justify-center p-2'><Link >search for posts</Link></div>}
            </div>
        </div>
    )
}

export default RightHome