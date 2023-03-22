import style from './Home.module.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';


function FrontCart({
    objectId,
    destination,
    country,
    location,
    imageUrl,
    description,
}) {
    const { user } = useContext(UserContext);

    return (
        <div className={style.frontCart}>
            <h3>{description}</h3>
            <img src={imageUrl} alt={destination} />
            {user && <div><NavLink to={`/details/${objectId}`}>Details</NavLink></div>}
        </div>
    );
}

export default FrontCart;