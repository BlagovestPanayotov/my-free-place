import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { updateUser } from '../../../services/auth';
import { onBackClick } from '../../../utils/util';
import styles from './Profile.module.css';


function Profile({ navigate }) {
    const { user, userData, setUserData } = useContext(UserContext);
    const { loading, setLoading } = useContext(DestinationsContext);

    console.log(userData);

    const defaultValues = {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        countryOfLiving: userData?.countryOfLiving,
        imageUrl: userData?.imageUrl
    };

    const schema = object({
        firstName: string().min(3, 'The First name must contain at least 3 characters!'),
        lastName: string().min(3, 'The Last name must contain at least 3 characters!'),
        countryOfLiving: string().min(3, 'The country must contain at least 3 characters!'),
        imageUrl: string().min(1, 'Image URL is required~'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        setLoading(true);
        updateUser(user, data)
            .then(result => {
                setUserData(state => Object.assign(userData, data));
                setLoading(false);
                navigate('/profile');
            })
            .catch(err => {
                navigate('/home');
                console.log(err);
            });
    }

    return (
        <div className={styles.content}>
            <h1><i>{userData?.username}</i></h1>
            {loading ? <div className="loader"></div>
                : <>
                    <img src={userData?.imageUrl ? userData.imageUrl : '/img/usersImages/default-user.png'} alt='profile' />
                    <form id={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.conteiner}>
                            <label>First Name:</label>
                            <input {...register('firstName')} type="text" />
                            <div className={styles.error}>{errors['firstName']?.message}</div>
                        </div>
                        <div className={styles.conteiner}>
                            <label>Last Name:</label>
                            <input {...register('lastName')} type="text" />
                            <div className={styles.error}>{errors['lastName']?.message}</div>
                        </div>
                        <div className={styles.conteiner}>
                            <label>Contry of living:</label>
                            <input {...register('countryOfLiving')} type="text" />
                            <div className={styles.error}>{errors['countryOfLiving']?.message}</div>
                        </div>
                        <div className={styles.conteiner}>
                            <label>Image Url:</label>
                            <input {...register('imageUrl')} type="text" />
                            <div className={styles.error}>{errors['imageUrl']?.message}</div>
                            <div className={styles.imgUpload}>To upload your image click <a href='https://prikachi.net/' target="_blank" rel="noreferrer">HERE!</a></div>
                        </div>
                        <span>
                            <button type="submit">Update</button>
                            <button onClick={(e) => onBackClick(e, navigate)}>Back</button>
                        </span>

                    </form>
                </>}
        </div>
    );
}

export default Profile;