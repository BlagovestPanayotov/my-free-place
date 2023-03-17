import style from './Home.module.css';
import { NavLink } from 'react-router-dom';


function FrontCart({
    country, description, destination, imageUrl, location, _id, user
}) {
    return (
        <div className={style.frontCart}>
            <h3>{description}</h3>
            <img src={imageUrl} alt={destination} />
            {user && <div><NavLink to={`/details/${_id}`}>Details</NavLink></div>}
        </div>
    );
}

export default FrontCart;