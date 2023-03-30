import { useContext } from 'react';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function Catalog({ loading }) {

    const { user } = useContext(UserContext);
    const { destinations, destinationsCount, pageDestination, setPageDestination, } = useContext(DestinationsContext);

    const maxPage = Math.ceil(destinationsCount / 6);

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
            <div id={styles.pagin}>
                {destinationsCount > 6
                    ? (<>
                        {pageDestination > 1 ? <span onClick={() => setPageDestination(p => p - 1)}>&lt;Prev</span> : null}
                        <span>{pageDestination} from {maxPage}</span>
                        {pageDestination === maxPage ? null : <span onClick={() => setPageDestination(p => p + 1)}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default Catalog;