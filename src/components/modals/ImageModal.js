import styles from './Modals.module.css';

export const ImageModal = ({ open, imageUrl, setOpenModalImage }) => {
    if (!open) {
        return null;
    }
    return (
        <div className={styles.overlay} id={styles['overlay-img']}>
            <div className="modal-Contailner">
                <img id={styles['overlay-img']} onClick={() => setOpenModalImage(false)} src={imageUrl} alt='profile' />
            </div>
        </div>
    );
};