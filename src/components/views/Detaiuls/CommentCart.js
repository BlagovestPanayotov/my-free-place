import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { addLikeComment, deleteComent, getLikesComment, hasLikedComment } from '../../../services/data';
import { DeleteModal } from '../../modals/DeleteModal';
import styles from './Details.module.css';

function CommentCart({ content, objectId: commentId, setComments, owner, setCountComments, setPageComments }) {
    const { user } = useContext(UserContext);
    const [countLikes, setCountLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(true);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        Promise.all([getLikesComment(commentId), hasLikedComment(commentId, user?.objectId)])
            .then(([likesData, result]) => {
                setCountLikes(likesData.count);
                setHasLiked(result.results?.length > 0);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                throw err;
            });
    }, [commentId, user]);

    function onLike() {
        setLoading(true);
        setHasLiked(true);
        addLikeComment(commentId, user)
            .then(result => {
                setCountLikes(state => state + 1);
                setLoading(false);
            });
    }

    function onDelete() {
        setLoading(true);
        deleteComent(commentId, user)
            .then(result => {
                setCountComments(c => c - 1);
                setPageComments(p => p);
                setComments(state => state.filter(c => c.objectId !== commentId));
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                throw err;
            });
    }

    return (
        <>
            <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} onDelete={onDelete} />
            {loading
                ? <div className={styles['loader-comments']}></div>
                : <div className={styles['comment-cart']}>
                    <p>{content}</p>
                    {owner?.objectId === user?.objectId && <button onClick={() => setOpenDeleteModal(true)}>Delete</button>}
                    {!hasLiked && <button onClick={onLike}>Like</button>}

                    <div className={styles.likes}>Likes: {countLikes}</div>
                </div>
            }
        </>
    );
}

export default CommentCart;