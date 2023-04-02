import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { onBackClick } from '../../../utils/util';
import styles from './Details.module.css';


function ButtonsContainer({ currentDestination,
    setHasLikedPost,
    countLikesPost,
    addLikeDestination,
    setCountLikesPost,
    setOpenEditModal,
    setOpenDeleteModal,
    hasLikedPost }) {

    const { user } = useContext(UserContext);
    const { destinationId } = useParams();

    const navigate = useNavigate();
    const destinationOwner = currentDestination.owner?.objectId;

    function onLike() {
        setHasLikedPost(true);
        addLikeDestination(destinationId, user)
            .then(result => {
                setCountLikesPost(state => state += 1);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    return (
        <span>
            <button id={styles.likeDisplay} disabled>Likes: {countLikesPost}</button>
            {
                destinationOwner === user?.objectId
                    ? <>
                        <button onClick={() => setOpenEditModal(true)}>Edit</button>
                        <button onClick={() => setOpenDeleteModal(true)}>Delete</button>
                    </>
                    : !hasLikedPost && <button onClick={onLike}>{'Give a Like <3'}</button>

            }
            <br />
            <br />
            <button onClick={e => onBackClick(e, navigate)}>Back</button>
        </span>
    );
}

export default ButtonsContainer;