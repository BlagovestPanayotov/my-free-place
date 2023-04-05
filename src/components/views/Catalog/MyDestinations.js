import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { getMyItems } from '../../../services/data';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function MyDestinations() {

    const navigate = useNavigate();

    const { page } = useParams();

    const { user } = useContext(UserContext);
    const { destinations, setDestinations } = useContext(DestinationsContext);

    const [userCatalogPage, setUserCurrentPage] = useState(Number(page) ? Number(page) : 0);
    const [loading, setLoading] = useState(false);

    const skip = (page) => ((page - 1) * 6);
    const maxPage = useRef(Math.ceil(destinations.count / 6));

    useEffect(() => {
        if (user) {
            setLoading(true);
            getMyItems(skip(userCatalogPage), user.objectId, user)
                .then((data) => {
                    setDestinations(data);
                    maxPage.current = Math.ceil(data.count / 6);
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
    }, [user, userCatalogPage, setDestinations]);

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
                : destinations.results.length > 0
                    ? destinations.results.map(x => <DestinationCard
                        user={user}
                        key={x.objectId}
                        {...x}
                    />)
                    : < h2 id={styles.noDestination}>You have no Destinations yet!</h2>
            }
            <div id={styles.pagin}>
                {destinations.count > 6 && page > 0
                    ? (<>
                        {userCatalogPage > 1 ? <span onClick={onClickNext}>&lt;Prev</span> : null}
                        <span>{userCatalogPage} from {maxPage.current}</span>
                        {userCatalogPage === maxPage.current ? null : <span onClick={onPreviousNext}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default MyDestinations;