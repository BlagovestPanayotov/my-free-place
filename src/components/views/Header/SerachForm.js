import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { DestinationsContext } from '../../../contexts/DestinationsContext';
import { UserContext } from '../../../contexts/UserContext';
import { searchItems } from '../../../services/data';


function SearchForm({ navigate }) {

    const { setDestinations, countries } = useContext(DestinationsContext);
    const { user } = useContext(UserContext);

    const defaultValues = {
        destination: '',
        country: ''
    };

    const schema = object({
        destination: string(),
        country: string()
    });

    const { register, handleSubmit } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        searchItems(data, user)
            .then(result => {
                setDestinations(result.results);
                navigate('/catalog');
            })
            .catch(err => console.log);
    }

    return (
        <div id="search-form">
            <h2>See if we have what you are looking for.</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Country:</label>
                <select id="country" {...register('country')}>
                    <option key={'<*%all%*>'} value={''}>All</option>
                    {countries.map(({ objectId, name }) => <option key={objectId} value={name}>{name}</option>)}
                </select>
                <label>Destiantion name:</label>
                <input {...register('destination')} type="text" />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchForm;