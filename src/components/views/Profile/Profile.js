import styles from './Profile.module.css';


function Profile() {
    return (
        <div className={styles.content}>
            <h1><i>CUserName</i></h1>
            <img src='/img/profile.jpg' alt='profile'/>
            <form id={styles.form}>

                <label>First Name:</label>
                <input name="first-name" type="text" />
                <br />
                <label>Last Name:</label>
                <input name="last-name" type="text" />
                <br />
                <label>Contry of living:</label>
                <input name="country" type="text" />
                <br />
                <label>Phone number:</label>
                <input name="phone-number" type="text" />
                <br />
                <label>Email:</label>
                <input name="email" type="text" disabled defaultValue={'user.emal@abv.bg'}/>
                <br />
                <label>Image Url:</label>
                <input name="image-url" type="text"/>
                <br />
                <span>
                    <input type="submit" value="Update" />
                </span>

            </form>
        </div>
    );
}

export default Profile;