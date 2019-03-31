import React, { useState } from 'react';
import { Post } from '../services/Utility'
export const AuthContext = React.createContext({
    isAuthenticated: true,
    signIn: () => { },
    signOut: () => { }
});

const AuthProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = (username, password) => {
        const body = { Username: username, password: password }
        Post('/auth/token', body);

    }
    const signOut = () => {
        setIsAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

