import styles from './CreateEdit.module.css';

function CreateEdit() {
    return (
        <>
            <div className={styles.content}>
                <h1><i>Create your place</i></h1>
                <form id={styles.form}>
                    <table>
                        <tr>
                            <label>Destiantion name</label>
                            <input name="destination" type="text" />
                        </tr>
                        <tr>
                            <label>Country</label>
                            <select id="country">
                                <option value="bulgaria">Bulgaria</option>
                                <option value="england">England</option>
                                <option value="iceland">Iceland</option>
                                <option value="portugal">Portugal</option>
                            </select>
                        </tr>
                        <tr>
                            <label>Location</label>
                            <input name="loation" type="text" />
                        </tr>
                        <tr>
                            <label>Descriptuion</label>
                            <textarea name="description" type="text" />
                        </tr>
                        <span>
                            <input type="submit" value="Create" />
                        </span>
                    </table>
                </form>
            </div>

        </>
    );
}

export default CreateEdit;