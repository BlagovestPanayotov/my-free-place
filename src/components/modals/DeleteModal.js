import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { deleteItem } from '../../services/data';
import styles from './Modals.module.css';

export const DeleteModal = ({ openDeleteModal, setOpenDeleteModal, currentDestination, onDelete }) => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function onDeleteClick() {
        if (currentDestination) {
            deleteItem(currentDestination.objectId, user);
            setOpenDeleteModal(false);
            navigate('/catalog/1');
        } else {
            onDelete();
        }
    }

    if (!openDeleteModal) {
        return null;
    }

    return (
        <div className={styles.overlay} id={styles['overlay-delete']}>
            <h2 className={styles.deleteWarning}>Do you really want to delete {currentDestination?.destination ? `"${currentDestination.destination}"` : 'your comment'}?</h2>
            <h2 className={styles.deleteWarning}>Will be lost FOREVER!</h2>
            <button id={styles['btn-delete-yes']} onClick={() => onDeleteClick()}>Yes</button>
            <button id={styles['btn-delete-no']} onClick={() => setOpenDeleteModal(false)}>No</button>
        </div>
    );
};