import React from 'react';

export const AuthContext = React.createContext({
    isAuthenticated: true,
    signIn: () => { },
    signOut: () => { }
});