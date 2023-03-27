import styles from './Modals.module.css';

export const DeleteModal = ({ openDeleteModal, setOenDeleteModal, onDeleteClick }) => {
    if (!openDeleteModal) {
        return null;
    }
    return (
        <div className={styles.overlay} id={styles['overlay-delete']}>
            <h3>Do you really want to delete it? Will be lost FOREVER!</h3>
            <button id={styles['btn-delete-yes']} onClick={() => onDeleteClick()}>Yes</button>
            <button id={styles['btn-delete-no']} onClick={() => setOenDeleteModal(false)}>No</button>
        </div>
    );
};