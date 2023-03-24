import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import styles from './Details.module.css';

function CommentCart({ content, owner }) {
    const { user } = useContext(UserContext);
   

    return (
        <div className={styles['comment-cart']}>
            <p>{content}</p>
            {owner?.objectId === user?.objectId ?
                <button>Delete</button>
                : <button>Like</button>
            }

            <div className={styles.likes}>Likes: 4</div>
        </div>
    );
}

export default CommentCart;