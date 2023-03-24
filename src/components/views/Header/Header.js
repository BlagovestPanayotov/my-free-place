import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import LoginForm from './LoginForm';
import Navigation from './Navigation';
import SearchForm from './SerachForm';

function Header({ navigate }) {
    const { user } = useContext(UserContext);
    return (
        <>
            <Navigation navigate={navigate} />
            {user ?
                <SearchForm navigate={navigate} />
                : <LoginForm navigate={navigate} />
            }
        </>
    );
}

export default Header;