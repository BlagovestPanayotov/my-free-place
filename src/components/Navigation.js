import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <div id='navigation'>
            <ul>
                <li><div><NavLink to={'/'}>Home</NavLink></div></li>
                <li><div><NavLink to={'/catalog'}>Catalog</NavLink></div></li>
                <li><div><NavLink to={'/create'}>Create</NavLink></div></li>
                <li><div><NavLink to={'/free-time'}>Free Time</NavLink></div></li>
                <li><div><NavLink to={'/register'}>Register</NavLink></div></li>
                <li><div><NavLink to={'/about'}>About</NavLink></div></li>
                <li><div><NavLink to={'/logout'}>Logout</NavLink></div></li>
            </ul>
            <h1><i>My free plase</i></h1>
        </div>
    );
}

export default Navigation;