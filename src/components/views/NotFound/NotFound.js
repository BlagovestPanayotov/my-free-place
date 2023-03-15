import styles from './NotFound.module.css';


function NotFound() {
    return (
        <div className={styles.content}>
            <h1><img id={styles['sad-face-img']} src='/img/sad-face.png' alt='sad-face' /></h1>
            <p><strong>404: Page not found</strong></p>
        </div>
    );
}

export default NotFound;