import { useContext, useState } from 'react';
import { DestinationsContext } from '../contexts/DestinationsContext';
import { UserContext } from '../contexts/UserContext';
import { searchItems } from '../services/data';
import { submitHandler } from '../utils/util';

function SearchForm({ countries, navigate }) {

    const { destination, setDestinations } = useContext(DestinationsContext);
    const { user } = useContext(UserContext);

    const [values, setValues] = useState({
        destination: '',
        country: ''
    });

    function onValueChange(e) {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    function onSearchSubmit(data) {
        searchItems(values, user)
            .then(result => {
                setDestinations(result.results);
                navigate('/catalog');
            })
            .catch(err => console.log);
    }

    return (
        <div id="search-form">
            <h2>See if we have what you are looking for.</h2>
            <form onSubmit={submitHandler(onSearchSubmit, values)}>
                <label>Country:</label>
                <select id="country" name='country' value={values.country} onChange={onValueChange}>
                    <option key={'<*%all%*>'} value={''}>All</option>
                    {countries.map(({ objectId, name }) => <option key={objectId} value={name}>{name}</option>)}
                </select>
                <label>Destiantion name:</label>
                <input name="destination" type="text" value={values.destination} onChange={onValueChange} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchForm;