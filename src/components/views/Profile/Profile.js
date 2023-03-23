import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { UserContext } from '../../../contexts/UserContext';
import { onBackClick } from '../../../utils/util';
import styles from './Profile.module.css';


function Profile({ navigate }) {
    const { user } = useContext(UserContext);
    const defaultValues = {
        firsName: user?.firsName,
        lastName: user?.lastName,
        countryOfLiving: user?.countryOfLiving,
        phoneNumber: user?.phoneNumber,
        email: user.email,
        imageUrl: user?.imageUrl
    };


    const schema = object({
        firsName: string().min(3, 'The First name must contain at least 3 characters!').optional(),
        lastName: string().min(3, 'The Last name must contain at least 3 characters!').optional(),
        imageUrl: string().optional().max(100, 'The url can\'t be more than 100 characters'),
        countryOfLiving: string().optional().max(30, 'The country can\'t be more than 30 characters'),
        phoneNumber: string().max(15, 'The phone number can\'t be more than 15 numbers').optional()
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
            <img src={user.imageUrl ? user.imageUrl : '/img/usersImages/default-user.png'} alt='profile' />
            <form id={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <label>First Name:</label>
                <input {...register('firsName')} type="text" />
                <div className='error'>{errors['firstName']?.message}</div>
                <br />
                <label>Last Name:</label>
                <input {...register('lastName')} type="text" />
                <div className='error'>{errors['lastName']?.message}</div>
                <br />
                <label>Contry of living:</label>
                <input {...register('countryOfLiving')} type="text" />
                <div className='error'>{errors['countryOfLiving']?.message}</div>
                <br />
                <label>Phone number:</label>
                <input {...register('phoneNumber')} type="number" />
                <div className='error'>{errors['phoneNumber']?.message}</div>
                <br />
                <label>Email:</label>
                <input {...register('email')} type="text" disabled defaultValue={user?.username} />
                <div className='error'>{errors['email']?.message}</div>
                <br />
                <label>Image Url:</label>
                <input {...register('imageUrl')} type="text" />
                <div className='error'>{errors['imageUrl']?.message}</div>
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