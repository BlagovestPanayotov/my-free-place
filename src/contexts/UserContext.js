import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(undefined);

export const UserProvider = ({
    children
}) => {
    const [user, setUser] = useState(null);

    const userContext = {
        user,
        setUser
    };

    useEffect(() => {
        try {
            if (window.localStorage.getItem('user')) {
                setUser(JSON.parse(window.localStorage.getItem('user')));
            }
        } catch (err) {
            console.error(err.message);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(user));
    });


    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
};
