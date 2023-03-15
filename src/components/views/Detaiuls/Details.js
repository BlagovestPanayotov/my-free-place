import styles from './Details.module.css';


function Details() {
    return (
        <div className={styles.content}>
            <h1><i>CUserName</i></h1>
            <img src='/img/GOPR4169.JPG' alt='palce' />
            <form id={styles.form}>
                <label>Destination:</label>
                <input name="destination" type="text" defaultValue={'Black Sand Beach'} />
                <br />
                <label>Contrey:</label>
                <select id="country" defaultValue={'iceland'}>
                    <option value="bulgaria">Bulgaria</option>
                    <option value="england">England</option>
                    <option value="iceland">Iceland</option>
                    <option value="portugal">Portugal</option>
                </select>
                <br />
                <label>Image Url:</label>
                <input name="image-url" type="text" defaultValue={'/img/GOPR4169.JPG'} />
                <br />
                <label>Description:</label>
                <textarea id="description" defaultValue={'Magical place. The sand is really black and is a place you can recognise from the telenovel "Games of Thrones".'}></textarea>
                <br />
            </form>
            <span>
                <button type="submit" value="Edit">Edit</button>
                <button type="submit" value="Delete">Delete</button>
            </span>
        </div>
    );
}

export default Details;