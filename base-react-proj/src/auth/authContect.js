import React from 'react';

const authContect = React.createContext({
    isAuthenticated: false,
    token: null,
    user: null
});

export default authContect;

