import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { getMyItems } from '../../../services/data';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function MyDestinations() {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { page } = useParams();
    const [userCatalogPage, setUserCurrentPage] = useState(Number(page) ? Number(page) : 1);
    const [userDestinations, setUserDestinations] = useState([]);
    const [userDestinationsCount, setUserDestinationCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const skip = (page) => ((page - 1) * 6);
    const maxPage = Math.ceil(userDestinationsCount / 6);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getMyItems(skip(userCatalogPage), user.objectId, user)
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
    }, [user, userCatalogPage]);

    function onClickNext() {
        navigate(`/my-destinations/${userCatalogPage - 1}`);
        setUserCurrentPage(p => p - 1);
    }

    function onPreviousNext() {
        navigate(`/my-destinations/${userCatalogPage + 1}`);
        setUserCurrentPage(p => p + 1);
    }

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
                        {userCatalogPage > 1 ? <span onClick={onClickNext}>&lt;Prev</span> : null}
                        <span>{userCatalogPage} from {maxPage}</span>
                        {userCatalogPage === maxPage ? null : <span onClick={onPreviousNext}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default MyDestinations;