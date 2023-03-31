import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm, } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { UserContext } from '../../../contexts/UserContext';
import { addLikeDestination, deleteItem, getById, getComments, getLikesDestination, hasLikedDestination, postComment } from '../../../services/data';
import { onBackClick } from '../../../utils/util';
import { DeleteModal } from '../../modals/DeleteModal';
import EditModal from '../../modals/EditModal';
import { ImageModal } from '../../modals/ImageModal';

import CommentCart from './CommentCart';
import styles from './Details.module.css';


function Details() {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { destinationId } = useParams();
    const [currentDestination, setCurrentDestination] = useState({});

    const [comments, setComments] = useState([]);
    const [countLikesPost, setCountLikesPost] = useState(0);
    const [hasLikedPost, setHasLikedPost] = useState(true);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [countComments, setCountComments] = useState(0);
    const [pageComments, setPageComments] = useState(1);
    const [loading, setLoading] = useState(false);

    const skip = (page) => ((page - 1) * 3);

    useEffect(() => {
        setLoading(true);
        if (destinationId) {
            Promise.all([getById(destinationId),
            getComments(skip(pageComments), destinationId),
            getLikesDestination(destinationId),
            hasLikedDestination(destinationId, user?.objectId)])
                .then(([dataDestination, dataComments, likesData, hasLikedData]) => {
                    setCurrentDestination(dataDestination);
                    setComments(dataComments.results);
                    setCountComments(dataComments.count);
                    setCountLikesPost(likesData.count);
                    setHasLikedPost(hasLikedData.results?.length > 0);
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
    }, [destinationId, setCurrentDestination, user, setLoading, pageComments]);

    function onDeleteClick() {
        deleteItem(destinationId, user);
        navigate('/catalog');
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
                setCountComments(c => c + 1);
                reset();
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    //On like
    function onLike() {
        setHasLikedPost(true);
        addLikeDestination(destinationId, user)
            .then(result => {
                setCountLikesPost(state => state += 1);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    const destinationOwner = currentDestination.owner?.objectId;
    const maxPage = Math.ceil(countComments / 3);


    return (
        <div className={styles.content}>
            {loading
                ? <div className="loader"></div>
                : <>
                    <h1><i>{currentDestination.destination}</i></h1>
                    <img className={styles.imgDetails} onClick={() => setOpenModalImage(true)} src={currentDestination.imageUrl} alt={currentDestination.destination} />
                    <ImageModal open={openModalImage} setOpenModalImage={setOpenModalImage} imageUrl={currentDestination.imageUrl} />
                    <DeleteModal name={currentDestination.destination} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} onDeleteClick={onDeleteClick} />
                    <EditModal openEditModal={openEditModal}
                        setOpenEditModal={setOpenEditModal}
                        currentDestination={currentDestination}
                        setCurrentDestination={setCurrentDestination}
                        loading={loading}
                        setLoading={setLoading} />
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
                                    <button onClick={() => setOpenEditModal(true)}>Edit</button>
                                    <button onClick={() => setOpenDeleteModal(true)}>Delete</button>
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
                                comments.slice(0, 3).map(c =>
                                    <CommentCart
                                        key={c.objectId}
                                        setComments={setComments}
                                        setCountComments={setCountComments}
                                        setPageComments={setPageComments}
                                        {...c}>
                                    </CommentCart>)
                                : <h3>No comments yet</h3>
                            }
                        </div>
                        <div id={styles.pagin}>
                            {countComments > 3
                                ? (<>
                                    {pageComments > 1 ? <span onClick={() => setPageComments(p => p - 1)}>&lt;Prev</span> : null}
                                    <span>{pageComments} from {maxPage}</span>
                                    {pageComments === maxPage ? null : <span onClick={() => setPageComments(p => p + 1)}>Next&gt;</span>}
                                </>)
                                : null}
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default Details;