import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitHandler } from '../utils/util';


function LoginForm({ onLoginSubmit }) {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    function onValueChange(e) {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }



    return (
        <div id="login-form">
            <h2>Member Login</h2>
            <form onSubmit={submitHandler(onLoginSubmit, values)}>
                <label htmlFor='username'>Username:</label>
                <input name="username" type="text" value={values.username} onChange={onValueChange} />
                <label htmlFor='password'>Password:</label>
                <input name="password" type="password" value={values.password} onChange={onValueChange} />
                <button type="submit" >Login </button>
            </form>
            <span>Not a member? Register <Link to={'/register'}>here</Link>.</span>
        </div>
    );
}

export default LoginForm;