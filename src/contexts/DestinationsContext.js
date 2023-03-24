import { createContext, useEffect, useState } from 'react';
import { getAll, getCountries, getMyItems } from '../services/data';

export const DestinationsContext = createContext(null);

export const DestinationsProvider = ({ children, user }) => {
    const [countries, setCountries] = useState([]);
    const [userDestinations, setUserDestination] = useState([]);
    const [currentDestinationId, setCurrentDestinationId] = useState(null);
    const [currentDestination, setCurrentDestination] = useState({});
    const [destinations, setDestinations] = useState([]);
    const [lastDestinations, setLastDestinations] = useState([]);
    const [loading, setLoading] = useState(false);

    const destinationsContext = {
        countries,
        setCountries,
        userDestinations,
        setUserDestination,
        currentDestinationId,
        setCurrentDestinationId,
        currentDestination,
        setCurrentDestination,
        destinations,
        setDestinations,
        lastDestinations,
        setLastDestinations,
        loading,
        setLoading
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([getAll(), getCountries()]).then(([data, countries]) => {
            setDestinations(data.results);
            setLastDestinations(data.results.slice(-2));
            setCountries(countries.results);
            setLoading(false);
        });

    }, []);

    useEffect(() => {
        if (user) {
            getMyItems(user.objectId, user)
                .then((data) => setUserDestination(data.results))
                .catch(console.log);
        } else {
            return;
        }
    }, [user]);

    return (
        <DestinationsContext.Provider value={destinationsContext}>
            {children}
        </DestinationsContext.Provider>
    );
};
