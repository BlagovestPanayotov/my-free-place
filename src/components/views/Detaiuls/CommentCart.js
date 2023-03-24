// import { useContext } from 'react';
// import { UserContext } from '../../../contexts/UserContext';
import styles from './Details.module.css';

function CommentCart({content}) {
    // const { user } = useContext(UserContext);

    return (
        <div className={styles['comment-cart']}>
            <p>{content}</p>
            <button>Like</button>
            <button>Delete</button>
            <div className={styles.likes}>Likes: 4</div>
        </div>
    );
}

export default CommentCart;