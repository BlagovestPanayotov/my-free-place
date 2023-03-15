import styles from './CreateEdit.module.css';

function CreateEdit() {
    return (
            <div className={styles.content}>
                <h1><i>Create your place</i></h1>
                <form id={styles.form}>

                    <label>Destiantion name</label>
                    <input name="destination" type="text" />
                    <br />
                    <label>Country</label>
                    <select id="country">
                        <option value="bulgaria">Bulgaria</option>
                        <option value="england">England</option>
                        <option value="iceland">Iceland</option>
                        <option value="portugal">Portugal</option>
                    </select>
                    <br />
                    <label>Location</label>
                    <input name="loation" type="text" />
                    <br />
                    <label>Descriptuion</label>
                    <textarea name="description" type="text" />
                    <br />
                    <span>
                        <input type="submit" value="Create" />
                    </span>

                </form>
            </div>
    );
}

export default CreateEdit;