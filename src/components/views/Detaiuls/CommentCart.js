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

    useEffect(() => {
        Promise.all([getLikesComment(commentId), hasLikedComment(commentId, user?.objectId)])
            .then(([likesData, result]) => {
                setCountLikes(likesData.count);
                setHasLiked(result.results?.length > 0);
            })
            .catch(err => console.log);
    }, [commentId, user]);

    function onLike() {
        setHasLiked(true);
        addLikeComment(commentId, user)
            .then(result => {
                setCountLikes(state => state += 1);
            });
    }

    function onDelete() {
        deleteComent(commentId, user)
            .then(result => {
                setComments(state => state.filter(c => c.objectId !== commentId));
                
                setCountComments(c => {
                    c = c - 1;
                    
                    if ((c / 3) % 1 === 0) {
                        setPageComments(p => p - 1);
                    }
                    return c;
                });

            })
            .catch(console.log);
    }

    return (
        <>
            <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} onDeleteClick={onDelete} />
            <div className={styles['comment-cart']}>
                <p>{content}</p>
                {owner?.objectId === user?.objectId && <button onClick={() => setOpenDeleteModal(true)}>Delete</button>}
                {!hasLiked && <button onClick={onLike}>Like</button>}

                <div className={styles.likes}>Likes: {countLikes}</div>
            </div>
        </>
    );
}

export default CommentCart;