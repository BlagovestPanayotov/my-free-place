import { useContext, useState } from 'react';
import styles from './Create.module.css';
import { onBackClick } from '../../../utils/util';
import { createItem } from '../../../services/data';
import { UserContext } from '../../../contexts/UserContext';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';


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


    const schema = z.object({
        name: string().min(3, { message: 'The destination must contain at least 3 characters!' }),
        location: string().min(3, { message: 'The locatrion must contain at least 3 characters!' }),
        imageUrl: string(),
        description: string().max(100, { message: 'The description can contain maximum 100 characters!' }),
        country: string()
    });

    const { register, handleSubmit, formState } = useForm({
        defaultValues,
        resolver: zodResolver(schema)
    });

    const { errors } = formState;

    const [hasEmptyFeild, setHasEmptyField] = useState(false);

    function onCreateSubmit(data) {
        console.log(data);
        // setHasEmptyField(Object.values(data).includes(''));
        // if (hasEmptyFeild) {
        //     navigate('/create');
        // } else {
        //     createItem(data, user)
        //         .then(({ objectId }) => {
        //             setDestinations(state => [...state, { ...data, objectId }]);
        //             setLastDestinations(state => [state.pop(), { ...data, objectId }]);
        //             navigate('/catalog');
        //         });
        // }
    }

    return (
        <div className={styles.content}>
            <h1><i>Create your place</i></h1>
            {hasEmptyFeild && <h1>All fields are required!</h1>}
            <form onSubmit={handleSubmit(onCreateSubmit)} id={styles.form}>
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