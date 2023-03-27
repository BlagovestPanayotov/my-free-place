import styles from './Modals.module.css';

export const ImageModal = ({ open, imageUrl, setOpenModal }) => {
    if (!open) {
        return null;
    }
    return (
        <div className={styles.overlay}>
            <div className="modal-Contailner">
                <img onClick={() => setOpenModal(false)} src={imageUrl} alt='profile' />
            </div>
        </div>
    );
};