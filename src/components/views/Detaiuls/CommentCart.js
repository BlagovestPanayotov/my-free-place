import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { addLikeComment, deleteComent, getLikesComment, hasLikedComment } from '../../../services/data';
import { DeleteModal } from '../../modals/DeleteModal';
import styles from './Details.module.css';

function CommentCart({ content, objectId: commentId, setComments, owner, setCountComments, setPageComments, countComments, reset }) {
    const { user } = useContext(UserContext);
    const [likes, setLikes] = useState({ count: 0, hasLiked: true });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        Promise.all([getLikesComment(commentId), hasLikedComment(commentId, user?.objectId)])
            .then(([likesData, liked]) => {
                setLikes({ count: likesData.count, hasLiked: liked.results?.length > 0 });
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
        setLikes(s => ({ ...s, hasLiked: true }));
        addLikeComment(commentId, user)
            .then(result => {
                setLikes(state => ({ ...state, count: state.count + 1 }));
                setLoading(false);
            });
    }

    function onDelete() {
        setLoading(true);
        deleteComent(commentId, user);

        setCountComments(c => c - 1);
        setPageComments(p => {
            if (countComments % 3 === 1) { return p - 1; }
            return p;
        });
        setComments(state => state.filter(c => c.objectId !== commentId));
        setLoading(false);
        reset();
    }

    return (
        <>
            <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} onDelete={onDelete} />
            {loading
                ? <div className={styles['loader-comments']}></div>
                : <div className={styles['comment-cart']}>
                    <p>{content}</p>
                    {owner?.objectId === user?.objectId && <button onClick={() => setOpenDeleteModal(true)}>Delete</button>}
                    {!likes.hasLiked && <button onClick={onLike}>Like</button>}

                    <div className={styles.likes}>Likes: {likes.count}</div>
                </div>
            }
        </>
    );
}

export default CommentCart;