import { useContext, useState } from 'react';
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

    const [loading, setLoading] = useState();

    const navigate = useNavigate();
    const destinationOwner = currentDestination.owner?.objectId;

    function onLike() {
        setLoading(true);
        setHasLikedPost(true);
        addLikeDestination(destinationId, user)
            .then(result => {
                setCountLikesPost(state => state += 1);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    return (
        <span>
            <button className={loading? styles.buttonload: styles.likeDisplay} disabled>Likes: {countLikesPost}</button>
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