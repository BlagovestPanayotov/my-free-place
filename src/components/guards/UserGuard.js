import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';


export const UserGuard = ({ children }) => {

    const { user } = useContext(UserContext);
    console.log(user);

    if (!user) {
        return <Navigate to='/catalog' replace />;
    }

    return children ? children : <Outlet />;
};