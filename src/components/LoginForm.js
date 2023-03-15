import { Link } from 'react-router-dom';


function LoginForm() {
    return (
        <div id="login-form">
            <h2>Member Login</h2>
            <form>
                <label>Username:</label>
                <input name="username" type="text" />
                <label>Password:</label>
                <input name="password" type="password" />
                <input type="submit" value="Login" />
            </form>
            <span>Not a member? Register <Link to={'/register'}>here</Link>.</span>
        </div>
    );
}

export default LoginForm;