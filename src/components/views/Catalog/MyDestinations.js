import { useContext, useEffect, useState } from 'react';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { getMyItems } from '../../../services/data';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function MyDestinations() {

    const { user } = useContext(UserContext);
    const { userCatalogPage, setUserCatalogPage } = useContext(DestinationsContext);
    const [userDestinations, setUserDestinations] = useState([]);
    const [userDestinationsCount, setUserDestinationCount] = useState(0);

    const [loading, setLoading] = useState(false);

    const skip = (page) => ((page - 1) * 6);
    const maxPage = Math.ceil(userDestinationsCount / 6);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getMyItems(skip(setUserCatalogPage), user.objectId, user)
                .then((data) => {
                    setUserDestinations(data.results);
                    setUserDestinationCount(data.count);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    throw err;
                });
        } else {
            return;
        }
    }, [user, setUserCatalogPage]);

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
                        {userCatalogPage > 1 ? <span onClick={() => setUserCatalogPage(p => p - 1)}>&lt;Prev</span> : null}
                        <span>{userCatalogPage} from {maxPage}</span>
                        {userCatalogPage === maxPage ? null : <span onClick={() => setUserCatalogPage(p => p + 1)}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default MyDestinations;