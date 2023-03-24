import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { deleteItem, getById } from '../../../services/data';
import { onBackClick } from '../../../utils/util';

import CommentCart from './CommentCart';
import styles from './Details.module.css';


function Details() {
    const { currentDestination, setCurrentDestination,
        destinations, setDestinations,
        setLastDestinations,
        loading, setLoading } = useContext(DestinationsContext);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { destinationId } = useParams();


    useEffect(() => {
        setLoading(true);
        if (destinationId) {
            getById(destinationId)
                .then(data => {
                    setCurrentDestination(data);
                    setLoading(false);
                })
                .catch(err => console.log);
        } else {
            return;
        }
    }, [destinationId]);

    function onDeleteClick() {
        if (window.confirm('Are you sure you want to delete this destination?')) {
            deleteItem(destinationId, user);

            const newDestinations = destinations.filter(x => x.objectId !== destinationId);

            setDestinations(newDestinations);
            setLastDestinations(newDestinations.slice(-2));
            navigate('/catalog');
        } else {
            return;
        }
    }


    return (
        <div className={styles.content}>
            {loading
                ? <div className="loader"></div>
                : <>
                    <h1><i>{currentDestination.destination}</i></h1>
                    <img src={currentDestination.imageUrl} alt={currentDestination.destination} />
                    <table id={styles.form}>
                        <tbody>
                            <tr>
                                <td><label>Destination:</label></td>
                                <td><div id='destination'>{currentDestination.destination} </div></td>
                            </tr>
                            <tr>
                                <td><label>Countrey:</label></td>
                                <td><div id='country'>{currentDestination.country} </div></td>
                            </tr>
                            <tr>
                                <td><label>Image Url:</label></td>
                                <td><div id='imageUrl'>{currentDestination.imageUrl} </div></td>
                            </tr>
                            <tr>
                                <td><label>Description:</label></td>
                                <td><div id='description'>{currentDestination.description} </div></td>
                            </tr>

                        </tbody>
                    </table>
                    <span>
                        <button >Like / Liked: 1</button>
                        <button onClick={() => navigate(`/${destinationId}/edit`)}>Edit</button>
                        <button onClick={onDeleteClick}>Delete</button>
                        <br />
                        <br />
                        <button onClick={e => onBackClick(e, navigate)}>Back</button>
                    </span>
                    <div id={styles.comments}>
                        <h4>Comments:</h4>
                        <div>
                            <CommentCart />
                            <CommentCart />
                            <CommentCart />
                        </div>
                    </div>
                </>
            }
        </div >
    );
}

export default Details;