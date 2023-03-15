import styles from './Register.module.css';

function Register() {
    return (
        <>
            <div className={styles.content}>
                <h1><i>Register</i></h1>
                <form id={styles.form}>
                    <table>                        
                        <tr>
                            <label>Email</label>
                            <input name="name" type="text" />
                        </tr>
                        <tr>
                            <label>Password</label>
                            <input name="password" type="password" />
                        </tr>
                        <tr>
                            <label>Repeat password</label>
                            <input name="repass" type="password" />
                        </tr>
                        <span>
                            <input type="submit" value="Register" />
                        </span>
                    </table>
                </form>
            </div>

        </>
    );
}

export default Register;

