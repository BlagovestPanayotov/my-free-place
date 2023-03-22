import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function MyDestinations({ loading, userDestinations }) {

    const { user } = useContext(UserContext);

    return (
        <div className={styles.content}>
            {loading
                ? <h1>Loading...</h1>
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