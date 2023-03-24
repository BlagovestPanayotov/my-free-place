import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(undefined);

export const UserProvider = ({
    children
}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        try {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        } catch (err) {
            console.log(err.message);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            localStorage.removeItem('user');
        } else {
            window.localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

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
