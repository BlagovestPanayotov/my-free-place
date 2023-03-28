import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DestinationsContext } from '../../contexts/DestinationsContext';
import { UserContext } from '../../contexts/UserContext';


export const OwnerGuard = ({ children }) => {
    const { currentDestination } = useContext(DestinationsContext);
    const { user } = useContext(UserContext);
    console.log(currentDestination.owner.objectId);
    console.log(user.objectId);

    if (currentDestination.owner.objectId !== user.objectId) {
        return <Navigate to={`/${currentDestination.owner.objectId}/details`} replace/>;
    }

    return children ? children : <Outlet />;
};