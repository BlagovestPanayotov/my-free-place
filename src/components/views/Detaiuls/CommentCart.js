import styles from './Details.module.css';


function CommentCart(){
    return (
        <div className={styles['comment-cart']}>
            <p>Some comment</p>
            <button>Like</button>
            <button>Delete</button>
            <div className={styles.likes}>Likes: 4</div>
        </div>
    );
}

export default CommentCart;