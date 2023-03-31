import { useContext, useEffect, useState } from 'react';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { getAll } from '../../../services/data';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function Catalog() {

    const { user } = useContext(UserContext);
    const { catalogPage, setCatalogPage } = useContext(DestinationsContext);
    const [destinations, setDestinations] = useState([]);
    const [destinationsCount, setDestinationCount] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const skip = (page) => ((page - 1) * 6);
    const maxPage = Math.ceil(destinationsCount / 6);

    useEffect(() => {
        setLoading(true);
        getAll(skip(catalogPage))
            .then(data => {
                setDestinations(data.results);
                setDestinationCount(data.count);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                throw err;
            });
    }, [catalogPage]);

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
                        {catalogPage > 1 ? <span onClick={() => setCatalogPage(p => p - 1)}>&lt;Prev</span> : null}
                        <span>{catalogPage} from {maxPage}</span>
                        {catalogPage === maxPage ? null : <span onClick={() => setCatalogPage(p => p + 1)}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default Catalog;