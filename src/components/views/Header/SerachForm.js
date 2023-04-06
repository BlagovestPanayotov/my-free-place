import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import { DestinationsContext } from '../../../contexts/DestinationsContext';


function SearchForm({ navigate }) {

    const { countries, setSearch } = useContext(DestinationsContext);

    const defaultValues = {
        destination: '',
        country: ''
    };

    const schema = object({
        destination: string(),
        country: string()
    });

    const { register, handleSubmit, reset } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        navigate('/catalog/1');
        setSearch({...data});
    }

    function onClickClear() {
        reset();
        setSearch({
            destination: '',
            country: ''
        });
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
                <label>Destination name:</label>
                <input {...register('destination')} type="text" />
                <button type="submit">Search</button>
                <Link id='clearSearch' onClick={onClickClear}>Clear</Link>
            </form>
        </div>
    );
}

export default SearchForm;