import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const storedRefreshToken = localStorage.getItem('refresh_token');
        const storedAccessToken = localStorage.getItem('access_token');
        const storedUsername = localStorage.getItem('username');

        if (storedRefreshToken && storedAccessToken && storedUsername) {
            setAuth({
                refreshToken: storedRefreshToken,
                accessToken: storedAccessToken,
                username: storedUsername
            });
        }
    }, []);

    useEffect(() => {
        if (auth) {
            localStorage.setItem('refresh_token', auth.refreshToken);
            localStorage.setItem('access_token', auth.accessToken);
            localStorage.setItem('username', auth.username);
        } else {
            localStorage.clear();
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
