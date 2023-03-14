function LoginForm() {
    return (
        <div id="login-form">
          <h2>Member Login</h2>
          <form>
            <table>
              <tr>
                <label>Username</label>
                <input name="username" type="text" />
              </tr>
              <tr>
                <label>Password</label>
                <input name="password" type="password" />
              </tr>
              <input type="submit" value="Login" />
            </table>
          </form>
          <span>Not a member? Register <a href="/register">here</a>.</span>
        </div>
    );
}

export default LoginForm;