import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { searchItems } from '../../../services/data';
import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function Catalog() {

    const navigate = useNavigate();

    const { page } = useParams();

    const { user } = useContext(UserContext);
    const { search } = useContext(DestinationsContext);
    const { destinations, setDestinations } = useContext(DestinationsContext);

    const [currentPage, setCurrentPage] = useState(Number(page) ? Number(page) : 0);
    const [loading, setLoading] = useState(false);

    const skip = (page) => page <= 0 ? 1 : ((page - 1) * 6);
    const maxPage = useRef(Math.ceil(destinations.count / 6));

    useEffect(() => {
        setLoading(true);
        searchItems(skip(currentPage), search)
            .then(data => {
                console.log(data);
                setDestinations(data);
                maxPage.current = Math.ceil(data.count / 6);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                throw err;
            });
    }, [search, currentPage, setDestinations]);

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
                : destinations.results.length > 0
                    ? destinations.results.map(x => <DestinationCard
                        user={user}
                        key={x.objectId}
                        {...x}
                    />)
                    : <h2 id={styles.noDestination}>No Destinations Found!</h2>
            }
            <div id={styles.pagin}>
                {destinations.count > 6 && currentPage > 0
                    ? (<>
                        {currentPage > 1 ? <span onClick={onClickNext}>&lt;Prev</span> : null}
                        <span>{currentPage} from {maxPage.current}</span>
                        {currentPage === maxPage.current ? null : <span onClick={onPreviousNext}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default Catalog;