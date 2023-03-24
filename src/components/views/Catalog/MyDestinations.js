import { useContext } from 'react';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function MyDestinations() {

    const { user } = useContext(UserContext);
    const { userDestinations, loading } = useContext(DestinationsContext);

    return (
        <div className={styles.content}>
            {loading
                ? <div className="loader"></div>
                : userDestinations.map(x => <DestinationCard
                    user={user}
                    key={x.objectId}
                    {...x}
                />)
            }
        </div>
    );
}

export default MyDestinations;