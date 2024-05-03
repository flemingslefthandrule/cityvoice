import Dummy from "../assets/Dummy.png"
import { useNavigate } from 'react-router-dom'


const Popup = (props) => {

    const navigate = useNavigate()

    return (
        <div className={`w-[30%] h-[50%] absolute top-[25%] left-[40%] bg-gray-800 rounded-xl z-50 p-2 ${(props.a) ? "block" : "hidden"}`}>
            <div className="flex justify-between items-center">
                <h1>{props.f}</h1>
                <div className="bg-red-600 rounded-full h-fit w-fit p-2 cursor-pointer" onClick={() => { props.set(false) }}>X</div>
            </div>
            <div className="w-full rounded-xl bg-gray-800 flex flex-col justify-center overflow-auto">
                    {props.list && props.list.map((user, index) => (
                        <div key={index} onClick={() => { navigate("/profile/" + user.username); props.set(false); }} className="flex gap-2 p-4 border-b-solid border-b-gray-900 border-b-[2px] cursor-pointer">
                            {user.username ? (
                                <>
                                    <img src={user.photo || Dummy} alt="" className="w-[1.5em] rounded-[50%]" />
                                    {user.username}
                                </>
                            ) : (
                                <>
                                    {user.err}
                                </>
                            )}
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default Popup;