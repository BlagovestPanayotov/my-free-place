import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { object, ref, string } from 'yup';
import { UserContext } from '../../../contexts/UserContext';
import * as authService from '../../../services/auth';
import { onBackClick } from '../../../utils/util';
import styles from './Register.module.css';

function Register({ navigate }) {
    const { setUser } = useContext(UserContext);
    
    const defaultValues = {
        username: '',
        email: '',
        password: '',
        repass: '',
    };

    const schema = object({
        username: string().min(8, 'The username must contain at least 8 characters!').required(),
        email: string().email('Invalid email!').required(),
        password: string()
            .min(8, 'Password must be 8 characters long').required(),
        // .matches(/[0-9]/, 'Password requires a number')
        // .matches(/[a-z]/, 'Password requires a lowercase letter')
        // .matches(/[A-Z]/, 'Password requires an uppercase letter')
        // .matches(/[^\w]/, 'Password requires a symbol'),
        repass: string().oneOf([ref('password'), null], 'Password dosen\'t match')
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        authService.register(data)
            .then(newUser => {
                setUser(newUser);
                navigate('/catalog');
            })
            .catch(err => {
                console.log(err.message);
                setUser(null);
            });
    }
    
    return (
        <>
            <div className={styles.content}>
                <h1><i>Register</i></h1>
                <form id={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username:</label>
                    <input {...register('username')} type="text" />
                    <div className={styles.error}>{errors.username?.message}</div>
                    <label htmlFor="email">Email:</label>
                    <input {...register('email')} type="text" />
                    <div className={styles.error}>{errors.email?.message}</div>
                    <label htmlFor="password">Password:</label>
                    <input {...register('password')} type="password" />
                    <div className={styles.error}>{errors.password?.message}</div>
                    <label htmlFor="repass">Repeat password:</label>
                    <input {...register('repass')} type="password" />
                    <div className={styles.error}>{errors.repass?.message}</div>
                    <span>
                        <button type="submit">Register</button>
                        <button onClick={(e) => onBackClick(e, navigate)}>Back</button>
                    </span>
                </form>
            </div>

        </>
    );
}

export default Register;

