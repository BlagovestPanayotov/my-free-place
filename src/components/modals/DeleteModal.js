import styles from './Modals.module.css';

export const DeleteModal = ({ openDeleteModal, setOpenDeleteModal, onDeleteClick, name }) => {
    if (!openDeleteModal) {
        return null;
    }
    return (
        <div className={styles.overlay} id={styles['overlay-delete']}>
            <h2 className={styles.deleteWarning}>Do you really want to delete {name ? `"${name}"` : 'your comment'}?</h2>
            <h2 className={styles.deleteWarning}>Will be lost FOREVER!</h2>
            <button id={styles['btn-delete-yes']} onClick={() => onDeleteClick()}>Yes</button>
            <button id={styles['btn-delete-no']} onClick={() => setOpenDeleteModal(false)}>No</button>
        </div>
    );
};