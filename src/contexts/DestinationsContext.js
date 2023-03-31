import { createContext, useContext, useEffect, useState } from 'react';
import { getAll, getCountries, getMyItems } from '../services/data';
import { UserContext } from './UserContext';

export const DestinationsContext = createContext(null);

export const DestinationsProvider = ({ children }) => {

    const { user } = useContext(UserContext);

    const [countries, setCountries] = useState([]);
    const [catalogPage, setCatalogPage] = useState(1);

    const [userDestinations, setUserDestinations] = useState([]);
    const [currentDestination, setCurrentDestination] = useState({});
    const [userDestinationsCount, setUserDestinationCount] = useState(0);
    const [userPageDestination, setUserPageDestination] = useState(1);
    const [loading, setLoading] = useState(false);

    const destinationsContext = {
        countries,
        setCountries,
        userDestinations,
        setUserDestinations,
        currentDestination,
        setCurrentDestination,
        loading,
        setLoading,
        catalogPage,
        setCatalogPage,
        userDestinationsCount,
        setUserDestinationCount,
        userPageDestination,
        setUserPageDestination
    };

    const skip = (page) => ((page - 1) * 6);

    useEffect(() => {
        getCountries()
            .then(countries => {
                setCountries(countries.results);
            });

    }, []);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getMyItems(skip(userPageDestination), user.objectId, user)
                .then((data) => {
                    setUserDestinations(data.results);
                    setUserDestinationCount(data.count);
                    setLoading(false);
                }
                )
                .catch(console.log);
        } else {
            return;
        }
    }, [user, userPageDestination]);



    return (
        <DestinationsContext.Provider value={destinationsContext}>
            {children}
        </DestinationsContext.Provider>
    );
};
