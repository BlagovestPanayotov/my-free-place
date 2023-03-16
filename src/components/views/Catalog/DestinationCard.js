import { NavLink } from 'react-router-dom';

import styles from './Catalog.module.css';


function DestinationCard({
    country, description, destination, imageUrl, location, _id
}) {
    return (
        <div className={styles.destinationCart}>
            <h3>{destination}</h3>
            <img src={imageUrl} alt={description}/>
            <h4><strong>Contrey: </strong> {country}</h4>
            <div>Likes: 1</div>
            <div id="button"><NavLink to={`/details/${_id}`}>Details</NavLink></div>
        </div>
    );
}

export default DestinationCard;