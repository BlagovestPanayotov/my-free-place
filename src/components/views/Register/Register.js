import { useState } from 'react';
import { submitHandler } from '../../../utils/util';
import styles from './Register.module.css';

function Register({ onRegisterSubmit }) {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        repass: ''
    });

    function onValueChange(e) {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <>
            <div className={styles.content}>
                <h1><i>Register</i></h1>
                <form id={styles.form} onSubmit={submitHandler(onRegisterSubmit, values)}>
                    <label htmlFor="username">Username:</label>
                    <input name="username" type="text" value={values.name} onChange={onValueChange} />
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="text" value={values.name} onChange={onValueChange} />
                    <label htmlFor="password">Password:</label>
                    <input name="password" type="password" value={values.password} onChange={onValueChange} />
                    <label htmlFor="repass">Repeat password:</label>
                    <input name="repass" type="password" value={values.repass} onChange={onValueChange} />
                    <span>
                        <input type="submit" value="Register" />
                    </span>
                </form>
            </div>

        </>
    );
}

export default Register;

