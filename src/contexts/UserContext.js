import { createContext, useEffect, useState } from 'react';
import { getUserData } from '../services/data';

export const UserContext = createContext(undefined);

export const UserProvider = ({
    children
}) => {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(window.localStorage.getItem('user'));
        } catch (err) {
            console.log(err.message);
            return null;
        }
    });
    
    const [userData, setUserData] = useState();


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
