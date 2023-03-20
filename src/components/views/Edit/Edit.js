import { useContext, useEffect, useState } from 'react';
import styles from './Edit.module.css';
import { submitHandler } from '../../../utils/util';
import { editItem, getById } from '../../../services/data';
import { UserContext } from '../../../contexts/UserContext';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { useParams } from 'react-router-dom';

function Edit({ countries, navigate }) {
    const { currentDestination, setCurrentDestination, destinations, setDestinations, setLastDestinations } = useContext(DestinationsContext);

    const { destinationId } = useParams();
    const { user } = useContext(UserContext);


    useEffect(() => {
        if (destinationId) {
            getById(destinationId)
                .then(data => {
                    setCurrentDestination(data);
                })
                .catch(err => console.log);
        } else {
            return;
        }
    }, [destinationId]);

    const [values, setValues] = useState(({
        destination: currentDestination.destination,
        country: currentDestination.country,
        location: currentDestination.location,
        imageUrl: currentDestination.imageUrl,
        description: currentDestination.description,
        owner: {
            __type: 'Pointer',
            className: '_User',
            objectId: user.objectId
        }
    }));
    const [hasEmptyFeild, setHasEmptyField] = useState(false);

    function onChangeHandler(e) {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    function onCreateSubmit(data) {
        setHasEmptyField(Object.values(data).includes(''));
        if (hasEmptyFeild) {
            navigate('/create');
        } else {
            editItem(destinationId, values, user)
                .then(({ objectId }) => {
                    setDestinations(state => state.map(x => x.objectId === destinationId ? Object.assign(x, values) : x));
                    setLastDestinations(destinations.slice(-2));
                    navigate('/catalog');
                });
        }
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
                    {countries?.map(({ objectId, name }) => <option key={objectId} value={name}>{name}</option>)}
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

export default Edit;