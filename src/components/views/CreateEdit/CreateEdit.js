import { useState } from 'react';
import styles from './CreateEdit.module.css';
import { submitHandler } from '../../../utils/util';

function CreateEdit({ countries, onCreateSubmit, hasEmptyFeild }) {
    const [values, setValues] = useState({
        destination: '',
        country: '',
        location: '',
        imageUrl: '',
        description: ''
    });

    function onChangeHandler(e) {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <div className={styles.content}>
            <h1><i>Create your place</i></h1>
            {hasEmptyFeild && <h1>All fields are required!</h1>}
            <form onSubmit={submitHandler(onCreateSubmit, values)} id={styles.form}>
                <label htmlFor="destination">Destiantion name:</label>
                <input value={values.destination} onChange={onChangeHandler} name="destination" type="text" />
                <br />
                <label htmlFor='country'>Country:</label>
                <select value={values.country} onChange={onChangeHandler} id="country" name='country'>
                    {countries.map(({ objectId, name }) => <option key={objectId} value={name}>{name}</option>)}
                </select>
                <br />
                <label htmlFor='location'>Location:</label>
                <input value={values.location} onChange={onChangeHandler} name="location" type="text" />
                <br />
                <label htmlFor='imageUrl'>ImageURL:</label>
                <input value={values.imageUrl} onChange={onChangeHandler} name="imageUrl" type="text" />
                <br />
                <label htmlFor='description'>Descriptuion:</label>
                <textarea value={values.description} onChange={onChangeHandler} name="description" type="text" />
                <br />
                <span>
                    <button type="submit">Submit</button>
                </span>

            </form>
        </div>
    );
}

export default CreateEdit;