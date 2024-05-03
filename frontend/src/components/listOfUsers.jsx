import Dummy from '../assets/Dummy.png'

const ListOfUsers = (props) => {

    const list = props.list;

    const tagUser = (username) => {
        props.setTag(username);
        props.setSearchResults([]);
    }

    return (
        <div className="w-full rounded">
            {list && list.map((user, index) => (
                <div key={index} onClick={()=>{tagUser(user.name)}} className="flex gap-2 p-2 border-2 border-slate-900 m-2 bg-slate-700 text-slate-300 hover:bg-slate-900 cursor-pointer">
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
        </div>
    )
}

export default ListOfUsers