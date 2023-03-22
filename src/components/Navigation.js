import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { logout } from '../services/auth';



function Navigation({ navigate }) {
    const { user, setUser } = useContext(UserContext);

    function onLogoutClick(e) {
        e.preventDefault();
        logout(user)
            .then(data => {
                setUser();
            });

        navigate('/');
    }

    return (
        <div id='navigation'>
            {user && <div id='profileNav'><NavLink to={'/profile'}><img src='/img/profile.jpg' alt='profile' width='31px' height='31px' /></NavLink></div>}
            <ul>
                <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/'}>Home</NavLink></div></li>
                <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/catalog'}>Catalog</NavLink></div></li>
                {user
                    ? <>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/my-destinations'}>My Destinations</NavLink></div></li>
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