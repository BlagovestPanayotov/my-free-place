import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { deleteItem, getById, getComments } from '../../../services/data';
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

    const [comments, setComments] = useState([]);


    useEffect(() => {
        setLoading(true);
        if (destinationId) {
            Promise.all([getById(destinationId), getComments(destinationId)])
                .then(([dataDestination, dataComments]) => {
                    setCurrentDestination(dataDestination);
                    setComments(dataComments.results);
                    setLoading(false);
                })
                .catch(err => console.log);
        } else {
            return;
        }
    }, [destinationId, setCurrentDestination, setLoading]);

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

    const destinationOwner = currentDestination.owner?.objectId;

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
                        {
                            destinationOwner === user?.objectId
                                ? <>
                                    <button onClick={() => navigate(`/${destinationId}/edit`)}>Edit</button>
                                    <button onClick={onDeleteClick}>Delete</button>
                                </>
                                : <button >Like / Liked: 1</button>
                        }

                        <br />
                        <br />
                        <button onClick={e => onBackClick(e, navigate)}>Back</button>
                    </span>
                    <div id={styles.comments}>
                        <h4>Comments:</h4>
                        <form id={styles.postComentForm}>
                            <label id={styles.labelComentForm}>Write Comment</label>
                            <textarea></textarea>
                            <button type='submiut' id={styles.btnComentForm}>Post Comment</button>
                        </form>
                        <div id={styles.commentCardsContainer}>
                            {comments?.length > 0 ?
                                comments.map(c => <CommentCart key={c.objectId} {...c}></CommentCart>)
                                : <h3>No comments yet</h3>
                            }
                        </div>
                        <div id={styles.pagin}>
                            <span>&lt;Prev</span>
                            <span>3 from 5</span>
                            <span>Next&gt;</span>
                        </div>
                    </div>
                </>
            }
        </div >
    );
}

export default Details;