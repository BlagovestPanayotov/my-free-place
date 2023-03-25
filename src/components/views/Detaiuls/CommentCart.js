import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { addLikeComment, getLikesComment, hasLikedComment } from '../../../services/data';
import styles from './Details.module.css';

function CommentCart({ content, objectId: commentId, owner }) {
    const { user } = useContext(UserContext);
    const [countLikes, setCountLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        Promise.all([getLikesComment(commentId), hasLikedComment(commentId, user.objectId)])
            .then(([likesData, result]) => {
                setCountLikes(likesData.count);
                setHasLiked(((likesData.results).some(x => x.ownerId.objectId === user.objectId)));
                setHasLiked(result.results?.length > 0);
            })
            .catch(err => console.log);
    }, [commentId, user]);

    function onLike() {
        addLikeComment(commentId, user)
            .then(result => {
                setCountLikes(state => state += 1);
                setHasLiked(true);
            });
    }

    return (
        <div className={styles['comment-cart']}>
            <p>{content}</p>
            {owner?.objectId === user?.objectId ?
                <button>Delete</button>
                : hasLiked ? <></>
                    : <button onClick={onLike}>Like</button>
            }

            <div className={styles.likes}>Likes: {countLikes}</div>
        </div>
    );
}

export default CommentCart;