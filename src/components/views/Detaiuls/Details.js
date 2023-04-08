import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { addLikeDestination, getById, getLikesDestination, hasLikedDestination } from '../../../services/data';
import { DeleteModal } from '../../modals/DeleteModal';
import EditModal from '../../modals/EditModal';
import { ImageModal } from '../../modals/ImageModal';
import NotFound from '../NotFound/NotFound';
import ButtonsContainer from './ButtonsContainer';

import CommentsContainer from './CommentsContainer';
import styles from './Details.module.css';
import TableInfo from './TableInfo';


function Details() {
    const { user } = useContext(UserContext);


    const { destinationId } = useParams();
    const [currentDestination, setCurrentDestination] = useState({});

    const [countLikesPost, setCountLikesPost] = useState(0);
    const [hasLikedPost, setHasLikedPost] = useState(true);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (destinationId) {
            Promise.all([getById(destinationId),
            getLikesDestination(destinationId),
            hasLikedDestination(destinationId, user?.objectId)])
                .then(([dataDestination, likesData, hasLikedData]) => {
                    setCurrentDestination(dataDestination);
                    setCountLikesPost(likesData.count);
                    setHasLikedPost(hasLikedData.results?.length > 0);
                    setError(false);
                    setLoading(false);
                })
                .catch(err => {
                    if (err.code === 101) { setError(true); }
                    setLoading(false);
                    throw err;
                });
        } else {
            return;
        }
    }, [destinationId, setCurrentDestination, user, setLoading]);

    if (error) { return <NotFound />; }

    return (
        <div className={styles.content}>
            {loading
                ? <div className="loader"></div>
                : <>
                    <h1><i>{currentDestination.destination}</i></h1>
                    <img className={styles.imgDetails} onClick={() => setOpenModalImage(true)} src={currentDestination.imageUrl} alt={currentDestination.destination} />
                    <ImageModal open={openModalImage} setOpenModalImage={setOpenModalImage} imageUrl={currentDestination.imageUrl} />
                    <DeleteModal currentDestination={currentDestination} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
                    <EditModal openEditModal={openEditModal}
                        setOpenEditModal={setOpenEditModal}
                        currentDestination={currentDestination}
                        setCurrentDestination={setCurrentDestination}
                        loading={loading}
                        setLoading={setLoading} />
                    <TableInfo currentDestination={currentDestination} />
                    <ButtonsContainer
                        currentDestination={currentDestination}
                        setHasLikedPost={setHasLikedPost}
                        countLikesPost={countLikesPost}
                        addLikeDestination={addLikeDestination}
                        setCountLikesPost={setCountLikesPost}
                        setOpenEditModal={setOpenEditModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                        hasLikedPost={hasLikedPost}
                    />
                    <CommentsContainer />
                </>
            }
        </div>
    );
}

export default Details;