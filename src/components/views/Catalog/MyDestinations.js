import { useContext } from 'react';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function MyDestinations() {

    const { user } = useContext(UserContext);
    const { userDestinations, loading, userDestinationsCount, userPageDestination, setUserPageDestination } = useContext(DestinationsContext);

    const maxPage = Math.ceil(userDestinationsCount / 6);

    return (
        <div className={styles.content}>
            {loading
                ? <div className="loader"></div>
                : userDestinations.length > 0
                    ? userDestinations.map(x => <DestinationCard
                        user={user}
                        key={x.objectId}
                        {...x}
                    />)
                    : < h2 id={styles.noDestination}>You have no Destinations yet!</h2>
            }
            <div id={styles.pagin}>
                {userDestinationsCount > 6
                    ? (<>
                        {userPageDestination > 1 ? <span onClick={() => setUserPageDestination(p => p - 1)}>&lt;Prev</span> : null}
                        <span>{userPageDestination} from {maxPage}</span>
                        {userPageDestination === maxPage ? null : <span onClick={() => setUserPageDestination(p => p + 1)}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div >
    );
}

export default MyDestinations;