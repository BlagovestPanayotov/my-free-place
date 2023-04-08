import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import { UserContext } from '../../../contexts/UserContext';
import { login } from '../../../services/auth';


function LoginForm({ navigate }) {

    const { setUser } = useContext(UserContext);
    const [serverError, setServerError] = useState(null);

    const defaultValues = {
        username: '',
        password: ''
    };

    const schema = object({
        username: string().min(3, 'The username must contain at least 3 characters!'),
        password: string().min(3, 'The password must contain at least 3 characters!')
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        login(data)
            .then(newUser => {
                setUser(newUser);
                setServerError(null);
                navigate('/catalog/1');
            })
            .catch(err => {
                console.log(err);
                setServerError(err.error);
                setUser(null);
            });
    }


    return (
        <div id="login-form">
            <h2>Member Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='username'>Username:</label>
                <input {...register('username')} type="text" />
                <div className='error-login-fields'>{errors.username?.message}</div>
                <label htmlFor='password'>Password:</label>
                <input {...register('password')} type="password" />
                <div className='error-login-fields'>{errors.password?.message}</div>
                <div className='login-error'>{serverError}</div>
                <button type="submit" >Login </button>
            </form>
            <span>Not a member? Register <Link to={'/register'}>here</Link>.</span>
        </div>
    );
}

export default LoginForm;