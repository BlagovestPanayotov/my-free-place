import { useContext } from 'react';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function Catalog({ loading }) {

    const { user } = useContext(UserContext);
    const { destinations } = useContext(DestinationsContext);

    return (
        <div className={styles.content}>
            {loading
                ? <div className="loader"></div>
                : destinations.length > 0
                    ? destinations.map(x => <DestinationCard
                        user={user}
                        key={x.objectId}
                        {...x}
                    />)
                    : <h2 id={styles.noDestination}>No Destinations Found!</h2>
            }
        </div>
    );
}

export default Catalog;