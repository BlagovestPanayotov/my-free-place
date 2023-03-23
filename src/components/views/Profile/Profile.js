import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { number, object, string } from 'yup';
import { UserContext } from '../../../contexts/UserContext';
import { onBackClick } from '../../../utils/util';
import styles from './Profile.module.css';


function Profile({ navigate }) {
    const { user } = useContext(UserContext);
    const defaultValues = {
        destination: '',
        country: '',
        location: '',
        imageUrl: '',
        description: ''
    };


    const schema = object({
        'first-name': string().min(3, 'The First name must contain at least 3 characters!').optional(),
        'last-name': string().min(3, 'The Last name must contain at least 3 characters!').optional(),
        'image-url': string().optional().max(100, 'The url can\'t be more than 100 characters'),
        'country': string().optional().max(30, 'The country can\'t be more than 30 characters'),
        'phone-number': string().max(15, 'The phone number can\'t be more than 15 numbers').optional()
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        console.log(data);

        //must be a patch request. there is no email in the values, because email doesn't change!!!
    }

    return (
        <div className={styles.content}>
            <h1><i>CUserName</i></h1>
            <img src='/img/profile.jpg' alt='profile' />
            <form id={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <label>First Name:</label>
                <input {...register('first-name')} type="text" />
                <div className='error'>{errors['first-name']?.message}</div>
                <br />
                <label>Last Name:</label>
                <input {...register('last-name')} type="text" />
                <div className='error'>{errors['last-name']?.message}</div>
                <br />
                <label>Contry of living:</label>
                <input {...register('country')} type="text" />
                <div className='error'>{errors['country']?.message}</div>
                <br />
                <label>Phone number:</label>
                <input {...register('phone-number')} type="number" />
                <div className='error'>{errors['phone-number']?.message}</div>
                <br />
                <label>Email:</label>
                <input {...register('email')} type="text" disabled defaultValue={user?.username} />
                <div className='error'>{errors['email']?.message}</div>
                <br />
                <label>Image Url:</label>
                <input {...register('image-url')} type="text" />
                <div className='error'>{errors['image-url']?.message}</div>
                <br />
                <span>
                    <button type="submit">Update</button>
                    <button onClick={(e) => onBackClick(e, navigate)}>Back</button>
                </span>

            </form>
        </div>
    );
}

export default Profile;