import { NavLink } from "react-router-dom";

import styles from './Catalog.module.css';


function DestinationCard() {
    return (
        <div className={styles.destinationCart}>
            <h3>Destination</h3>
            <img src="./img/GOPR4169.JPG" alt="icland-black-sand-beach" />
            <h4><strong>Contrey:</strong> Some Contrey</h4>
            <div id="button"><NavLink to={'/details'}>Details</NavLink></div>
        </div>
    );
}

export default DestinationCard;