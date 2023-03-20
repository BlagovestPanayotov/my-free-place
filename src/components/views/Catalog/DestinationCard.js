import { NavLink } from 'react-router-dom';

import styles from './Catalog.module.css';


function DestinationCard({
    objectId,
    destination,
    country,
    location,
    imageUrl,
    description,
    user
}) {
    return (
        <div className={styles.destinationCart}>
            <h3>{destination}</h3>
            <img src={imageUrl} alt={description} />
            <h4><strong>Country: </strong> {country}</h4>
            <div>Likes: 1</div>
            {user && <div id="button"><NavLink to={`/details/${objectId}`}>Details</NavLink></div>}
        </div>
    );
}

export default DestinationCard;