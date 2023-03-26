import { createContext, useEffect, useState } from 'react';
import { getUserData } from '../services/data';

export const UserContext = createContext(undefined);

export const UserProvider = ({
    children
}) => {
    const [user, setUser] = useState();
    const [userData, setUserData] = useState();

    
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
    
    useEffect(() => {
        if (user) {
            getUserData(user)
                .then(setUserData)
                .catch(err => console.log);
        } else {
            setUserData(null);
        }
    }, [user]);

    const userContext = {
        user,
        setUser,
        userData,
        setUserData
    };

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
};
