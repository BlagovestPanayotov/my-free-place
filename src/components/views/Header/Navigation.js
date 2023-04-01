import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { logout } from '../../../services/auth';
import { getAll } from '../../../services/data';


function Navigation({ navigate }) {
    const { user, setUser, userData } = useContext(UserContext);
    const {setDestinations} = useContext(DestinationsContext);

    function onLogoutClick(e) {
        e.preventDefault();
        setUser();
        Promise.all([logout(user),getAll()])
            .then(([userData,destinations]) => {
                setDestinations(destinations.results);
            });
        navigate('/');
    }

    return (
        <div id='navigation'>
            {user && <div id='profileNav'><NavLink to={'/profile'}>
                <img src={userData?.imageUrl ? userData.imageUrl : '/img/usersImages/default-user.png'}
                    alt='profile' width='31px' height='31px' />
            </NavLink></div>}
            <ul>
                <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/'}>Home</NavLink></div></li>
                <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/catalog/1'}>Catalog</NavLink></div></li>
                {user
                    ? <>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/my-destinations/1'}>My Destinations</NavLink></div></li>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/create'}>Create</NavLink></div></li>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/free-time'}>Free Time</NavLink></div></li>
                        <li><div><Link to={'/'} onClick={e => onLogoutClick(e)}>Logout</Link></div></li>
                    </>
                    :
                    <>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/register'}>Register</NavLink></div></li>
                    </>}


                <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/about'}>About</NavLink></div></li>

            </ul>
            <h1><i>My free place</i></h1>
        </div>
    );
}

export default Navigation;