import { NavLink, isActive, redirect } from 'react-router-dom';

function Navigation({ user }) {
    return (
        <div id='navigation'>
            {user && <div id='profileNav'><NavLink to={'/profile'}><img src='/img/profile.jpg' alt='profile' width='31px' height='31px' /></NavLink></div>}
            <ul>
                <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/'}>Home</NavLink></div></li>
                <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/catalog'}>Catalog</NavLink></div></li>
                {user
                    ? <>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/create'}>Create</NavLink></div></li>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/free-time'}>Free Time</NavLink></div></li>
                        <li><div><NavLink className={({ isActive }) => isActive ? 'activeNav' : null} to={'/logout'}>Logout</NavLink></div></li>
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