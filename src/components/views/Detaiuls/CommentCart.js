import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { addLikeComment, deleteComent, getLikesComment, hasLikedComment } from '../../../services/data';
import { DeleteModal } from '../../modals/DeleteModal';
import styles from './Details.module.css';

function CommentCart({ content, objectId: commentId, comments, setComments, owner, setPageComments, maxPage, reset }) {
    const { user } = useContext(UserContext);
    const [likes, setLikes] = useState({ count: 0, hasLiked: true });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log('here');


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
        setLikes(({ count, hasLiked }) => ({ count: count + 1, hasLiked: !hasLiked }));
        addLikeComment(commentId, user)
            .then(result => {
                setLoading(false);
            });
    }

    function onDelete() {
        setLoading(true);
        deleteComent(commentId, user);

        setComments(({ results, count }) => ({ results: results.filter(c => c.objectId !== commentId), count: count - 1 }));

        setPageComments(p => {
            if (comments.count % 3 === 1) {
                maxPage.current = Math.ceil(comments.count / 3);
                return p - 1;
            }
            return p;
        });
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