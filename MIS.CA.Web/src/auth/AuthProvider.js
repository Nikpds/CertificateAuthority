import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = (username, password) => {
        //const body = { Username: username, password: password }
        //Post('/auth/token', body);
        setIsAuthenticated(true);

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

