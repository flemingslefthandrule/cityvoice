import useAuth from "./useAuth"
import RefreshToken from "./refreshTokens"
import { cat } from "./axios"
import { useEffect } from "react"

const AuthAxios = () => {
    const refresh = RefreshToken()
    const { auth } = useAuth()
    useEffect(() => {
        const RequestIntercept = cat.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth.accessToken}`
                }
                return config
            }, (Error) => Promise.reject(Error)
        )


        const responseIntercept = cat.interceptors.response.use(
            response => response,
            async (Error) => {
                const PreviousRequest = Error.config
                if (Error.response.status === 403 && !PreviousRequest.sent) {
                    PreviousRequest.sent = true
                    const NewAccesToken = await refresh()
                    PreviousRequest.headers["Authorization"] = `Bearer ${NewAccesToken}`
                    return cat(PreviousRequest)
                }
                return Promise.reject(Error)
            }
        )
        return () => {
            cat.interceptors.request.eject(RequestIntercept)
            cat.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])
    return cat
}
export default AuthAxios