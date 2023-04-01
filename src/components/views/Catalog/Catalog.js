import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { searchItems } from '../../../services/data';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function Catalog() {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { search } = useContext(DestinationsContext);
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(page) ? Number(page) : 1);
    const [destinations, setDestinations] = useState([]);
    const [destinationsCount, setDestinationCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const skip = (page) => ((page - 1) * 6);
    const maxPage = Math.ceil(destinationsCount / 6);

    useEffect(() => {
        setLoading(true);
        searchItems(skip(currentPage), search)
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
    }, [search, currentPage]);

    function onClickNext() {
        navigate(`/catalog/${currentPage - 1}`);
        setCurrentPage(p => p - 1);
    }

    function onPreviousNext() {
        navigate(`/catalog/${currentPage + 1}`);
        setCurrentPage(p => p + 1);
    }

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
                        {currentPage > 1 ? <span onClick={onClickNext}>&lt;Prev</span> : null}
                        <span>{currentPage} from {maxPage}</span>
                        {currentPage === maxPage ? null : <span onClick={onPreviousNext}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default Catalog;