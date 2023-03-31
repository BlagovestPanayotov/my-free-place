import { useContext, useState } from 'react';
import styles from './EditModal.module.css';
import { useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../../contexts/UserContext';
import { DestinationsContext } from '../../contexts/DestinationsContext';
import { editItem } from '../../services/data';

function EditModal({ openEditModal, setOpenEditModal, currentDestination }) {


    const { user } = useContext(UserContext);
    const { countries } = useContext(DestinationsContext);
    const { destinationId } = useParams();
    const [loading, setLoading] = useState(false);


    const defaultValues = {
        destination: currentDestination.destination,
        country: currentDestination.country,
        location: currentDestination.location,
        imageUrl: currentDestination.imageUrl,
        description: currentDestination.description
    };

    const schema = object({
        destination: string().min(3, 'The destination must contain at least 3 characters!'),
        location: string().min(3, 'The locatrion must contain at least 3 characters!'),
        imageUrl: string(),
        description: string().max(100, 'The description can contain maximum 100 characters!'),
        country: string()
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        setOpenEditModal(false);
        editItem(destinationId, data, user)
            .then((result) => {
            })
            .catch(err => {
                throw err;
            });
    }

    if (!openEditModal) {
        return null;
    }


    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                {loading
                    ? <div className="loader"></div>
                    : <>
                        <h1><i>Edit {currentDestination.destination}</i></h1>
                        <form onSubmit={handleSubmit(onSubmit)} id={styles.form}>
                            <div className={styles.conteiner}>
                                <label htmlFor="destination">Destiantion name:</label>
                                <input {...register('destination')} type="text" />
                                <div className={styles.error}>{errors.repass?.message}</div>
                            </div>
                            <div className={styles.conteiner}>
                                <label htmlFor='country'>Country:</label>
                                <select {...register('country')}>
                                    {countries.map(({ objectId, name }) => <option key={objectId} value={name}>{name}</option>)}
                                </select>
                                <div className={styles.error}>{errors.repass?.message}</div>
                            </div>
                            <div className={styles.conteiner}>
                                <label htmlFor='location'>Location:</label>
                                <input {...register('location')} type="text" />
                                <div className={styles.error}>{errors.repass?.message}</div>
                            </div>
                            <div className={styles.conteiner}>
                                <label htmlFor='imageUrl'>ImageURL:</label>
                                <input {...register('imageUrl')} type="text" />
                                <div className={styles.error}>{errors.repass?.message}</div>
                            </div>
                            <div className={styles.conteiner}>
                                <label htmlFor='description'>Descriptuion:</label>
                                <textarea {...register('description')} type="text" />
                                <div className={styles.error}>{errors.repass?.message}</div>
                            </div>
                            <span>
                                <button type="submit">Submit</button>
                                <button onClick={() => setOpenEditModal(false)}>Back</button>
                            </span>
                        </form>
                    </>
                }
            </div>
        </div>
    );
}

export default EditModal;