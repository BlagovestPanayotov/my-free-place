import { useContext} from 'react';
import styles from './Create.module.css';
import { onBackClick } from '../../../utils/util';
import { createItem } from '../../../services/data';
import { UserContext } from '../../../contexts/UserContext';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

function Create({ countries, navigate }) {
    const { user } = useContext(UserContext);
    const { setDestinations, setLastDestinations } = useContext(DestinationsContext);

    const defaultValues = {
        destination: '',
        country: '',
        location: '',
        imageUrl: '',
        description: ''
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
        createItem(data, user)
            .then(({ objectId }) => {
                setDestinations(state => [...state, { ...data, objectId }]);
                setLastDestinations(state => [state.pop(), { ...data, objectId }]);
                navigate('/catalog');
            })
            .catch(err => console.log);
    }

    return (
        <div className={styles.content}>
            <h1><i>Create your place</i></h1>
            <form onSubmit={handleSubmit(onSubmit)} id={styles.form}>
                <label htmlFor="destination">Destiantion name:</label>
                <input {...register('destination')} type="text" />
                <div className='error'>{errors.destination?.message}</div>
                <br />
                <label htmlFor='country'>Country:</label>
                <select {...register('country')}>
                    {countries.map(({ objectId, name }) => <option key={objectId} value={name}>{name}</option>)}
                </select>
                <div className='error'>{errors.country?.message}</div>
                <br />
                <label htmlFor='location'>Location:</label>
                <input {...register('location')} type="text" />
                <div className='error'>{errors.location?.message}</div>
                <br />
                <label htmlFor='imageUrl'>ImageURL:</label>
                <input {...register('imageUrl')} type="text" />
                <div className='error'>{errors.imageUrl?.message}</div>
                <br />
                <label htmlFor='description'>Descriptuion:</label>
                <textarea {...register('description')} type="text" />
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

export default Create;