import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from './axios/axios';
import { useContext } from 'react';
import { AuthContext } from './axios/authProvider';

const AuthProtection = ({ children }) => {
    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        if (auth && auth.refreshToken) {
            axios.post('/user/token/verify/', {
                token: auth.refreshToken
            })
            .then(function (response) {
                if (response.status !== 200) {
                    setAuth(null);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, [auth, setAuth]);

    if (!auth || !auth.refreshToken) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default AuthProtection;