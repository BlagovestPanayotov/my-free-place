import { createContext, useEffect, useState } from 'react';
import { getCountries } from '../services/data';

export const DestinationsContext = createContext(null);

export const DestinationsProvider = ({ children }) => {

    const [countries, setCountries] = useState([]);
    const [catalogPage, setCatalogPage] = useState(1);
    const [userCatalogPage, setUserCatalogPage] = useState(1);
    const [destiantions,setDestinations] = useState([]);
    const [search, setSearch] = useState({ destination: '', country: '' });

    const destinationsContext = {
        countries, setCountries,
        userCatalogPage, setUserCatalogPage,
        catalogPage, setCatalogPage,
        destiantions,setDestinations,
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
