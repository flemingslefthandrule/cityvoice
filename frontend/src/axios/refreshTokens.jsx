import axios from "./axios"
import useAuth from "./useAuth"


const RefreshToken = () => {
    const { setAuth } = useAuth()
    const refresh = async () => {
        const response = await axios.get("/user/token/refresh/", {
            withCredentials: true
        })
        setAuth(previous => {
            return { ...previous, accessToken: response.data.access, refreshToken : response.data.refresh }
        })
        return response.data.access
    }
    return refresh
}

export default RefreshToken