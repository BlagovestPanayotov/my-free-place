import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(undefined);

export const UserProvider = ({
    children
}) => {
    const [user, setUser] = useState(() => {
        try {
            if (window.localStorage.getItem('user')) {
                const state = (JSON.parse(window.localStorage.getItem('user')));
                return state;
            }
        } catch (err) {
            console.error(err.message);
            return null;
        }
    });

    const userContext = {
        user,
        setUser
    };

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
};
