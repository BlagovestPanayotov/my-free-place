import { NavLink, redirect } from 'react-router-dom';

function Navigation({ user }) {
    return (
        <div id='navigation'>
            {user && <div id='profileNav'><NavLink to={'/profile'}><img src='/img/profile.jpg' alt='profile' width='31px' height='31px' /></NavLink></div>}
            <ul>
                <li><div><NavLink to={'/'}>Home</NavLink></div></li>
                <li><div><NavLink to={'/catalog'}>Catalog</NavLink></div></li>
                {user
                    ? <>
                        <li><div><NavLink to={'/create'}>Create</NavLink></div></li>
                        <li><div><NavLink to={'/free-time'}>Free Time</NavLink></div></li>
                        <li><div><NavLink to={'/logout'}>Logout</NavLink></div></li>
                    </>
                    :
                    <>
                        <li><div><NavLink to={'/register'}>Register</NavLink></div></li>
                    </>}


                <li><div><NavLink to={'/about'}>About</NavLink></div></li>

            </ul>
            <h1><i>My free plase</i></h1>
        </div>
    );
}

export default Navigation;