import style from './Home.module.css';
import { NavLink } from 'react-router-dom';


function FrontCart({
    objectId,
    destination,
    imageUrl,
    description,
    user
}) {

    return (
        <div className={style.frontCart}>
            <h3>{description}</h3>
            <img src={imageUrl} alt={destination} />
            {user && <div><NavLink to={`/${objectId}/details`}>Details</NavLink></div>}
        </div>
    );
}

export default FrontCart;