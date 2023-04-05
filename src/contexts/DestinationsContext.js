import { createContext, useEffect, useState } from 'react';
import { getCountries } from '../services/data';

export const DestinationsContext = createContext(null);

export const DestinationsProvider = ({ children }) => {

    const [countries, setCountries] = useState([]);
    const [destinations, setDestinations] = useState({ results: [], count: 0 });
    const [search, setSearch] = useState({ destination: '', country: '' });

    const destinationsContext = {
        countries, setCountries,
        destinations, setDestinations,
        search, setSearch
    };

    useEffect(() => {
        getCountries()
            .then(countries => {
                setCountries(countries.results);
            });

    }, []);

    return (
        <DestinationsContext.Provider value={destinationsContext}>
            {children}
        </DestinationsContext.Provider>
    );
};
