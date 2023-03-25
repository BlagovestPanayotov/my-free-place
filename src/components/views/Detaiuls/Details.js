import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm, } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { addLikeDestination, deleteItem, getById, getComments, getLikesDestination, hasLikedDestination, postComment } from '../../../services/data';
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
    const [countLikesPost, setCountLikesPost] = useState(0);
    const [hasLikedPost, setHasLikedPost] = useState(true);


    useEffect(() => {
        setLoading(true);
        if (destinationId) {
            Promise.all([getById(destinationId),
            getComments(destinationId),
            getLikesDestination(destinationId),
            hasLikedDestination(destinationId, user?.objectId)])
                .then(([dataDestination, dataComments, likesData, hasLikedData]) => {
                    setCurrentDestination(dataDestination);
                    setComments(dataComments.results);
                    console.log(likesData);
                    setCountLikesPost(likesData.count);
                    setHasLikedPost(hasLikedData.results?.length > 0);
                    setLoading(false);
                })
                .catch(err => console.log);
        } else {
            return;
        }
    }, [destinationId, setCurrentDestination, user, setLoading]);

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

    //On submit

    const defaultValues = {
        content: ''
    };

    const schema = object({
        content: string().min(3, 'The content must contain at least 3 characters!').max(50, 'The content can be maximum 50 cahracter!')
    }).required();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        postComment(data, user, destinationId)
            .then(result => {
                const newComment = {
                    content: data.content,
                    destination: { __type: 'Pointer', className: 'Destination', objectId: destinationId },
                    owner: { __type: 'Pointer', className: '_User', objectId: user.objectId },
                    objectId: result.objectId
                };
                setComments(state => [...state, newComment]);
                reset();
            })
            .catch(err => console.log);
    }

    //On like
    function onLike() {
        setHasLikedPost(true);
        addLikeDestination(destinationId, user)
            .then(result => {
                setCountLikesPost(state => state += 1);
            })
            .catch(err => console.log);
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
                        <button id={styles.likeDisplay} disabled>Likes: {countLikesPost}</button>
                        {
                            destinationOwner === user?.objectId
                                ? <>
                                    <button onClick={() => navigate(`/${destinationId}/edit`)}>Edit</button>
                                    <button onClick={onDeleteClick}>Delete</button>
                                </>
                                : !hasLikedPost && <button onClick={onLike}>{'Give a Like <3'}</button>

                        }

                        <br />
                        <br />
                        <button onClick={e => onBackClick(e, navigate)}>Back</button>
                    </span>
                    <div id={styles.comments}>
                        <h4>Comments:</h4>

                        <form id={styles.postComentForm} onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor='content' id={styles.labelComentForm}>Write Comment</label>
                            <textarea {...register('content')}></textarea>
                            <p id={styles.errorP}>{errors.content?.message}</p>
                            <button type='submiut' id={styles.btnComentForm}>Post Comment</button>
                        </form>

                        <div id={styles.commentCardsContainer}>
                            {comments?.length > 0 ?
                                comments.map(c =>
                                    <CommentCart
                                        key={c.objectId}
                                        setComments={setComments}
                                        {...c}>
                                    </CommentCart>)
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