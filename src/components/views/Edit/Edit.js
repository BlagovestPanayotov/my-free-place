import { useContext, useEffect } from 'react';
import styles from './Edit.module.css';
import { onBackClick } from '../../../utils/util';
import { editItem, getById } from '../../../services/data';
import { UserContext } from '../../../contexts/UserContext';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function Edit({ countries, navigate }) {

    const { user } = useContext(UserContext);
    const { currentDestination, setCurrentDestination, destinations, setDestinations, setLastDestinations } = useContext(DestinationsContext);
    const { destinationId } = useParams();

    useEffect(() => {
        if (destinationId) {
            getById(destinationId)
                .then(data => {
                    setCurrentDestination(data);
                })
                .catch(err => console.log);
        } else {
            return;
        }
    }, [destinationId]);

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
        editItem(destinationId, data, user)
            .then(({ objectId }) => {
                setDestinations(state => state.map(x => x.objectId === destinationId ? Object.assign(x, data) : x));
                setLastDestinations(destinations.slice(-2));
                navigate('/catalog');
            })
            .catch(err => console.log);
    }

    return (
        <div className={styles.content}>
            <h1><i>Create your place</i></h1>
            <form onSubmit={handleSubmit(onSubmit)} id={styles.form}>
                <label htmlFor="destination">Destiantion name:</label>
                <input {...register('destination')} name="destination" type="text" />
                <div className='error'>{errors.destination?.message}</div>
                <br />
                <label htmlFor='country'>Country:</label>
                <select {...register('country')} id="country" name='country'>
                    {countries?.map(({ objectId, name }) => <option key={objectId} value={name}>{name}</option>)}
                </select>
                <div className='error'>{errors.country?.message}</div>
                <br />
                <label htmlFor='location'>Location:</label>
                <input {...register('location')} name="location" type="text" />
                <div className='error'>{errors.location?.message}</div>
                <br />
                <label htmlFor='imageUrl'>ImageURL:</label>
                <input {...register('imageUrl')} name="imageUrl" type="text" />
                <div className='error'>{errors.imageUrl?.message}</div>
                <br />
                <label htmlFor='description'>Descriptuion:</label>
                <textarea {...register('description')} name="description" type="text" />
                <div className='error'>{errors.description?.message}</div>
                <br />
                <span>
                    <button type="submit">Submit</button>
                    <button onClick={e => onBackClick(e, navigate)}>Back</button>
                </span>

            </form>
        </div>
    );
}

export default Edit;