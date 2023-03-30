import { createContext, useContext, useEffect, useState } from 'react';
import { getAll, getCountries, getMyItems } from '../services/data';
import { UserContext } from './UserContext';

export const DestinationsContext = createContext(null);

export const DestinationsProvider = ({ children }) => {

    const { user } = useContext(UserContext);

    const [countries, setCountries] = useState([]);
    const [userDestinations, setUserDestinations] = useState([]);
    const [currentDestination, setCurrentDestination] = useState({});
    const [destinations, setDestinations] = useState([]);
    const [lastDestinations, setLastDestinations] = useState([]);
    const [destinationsCount, setDestinationCount] = useState(0);
    const [pageDestination, setPageDestination] = useState(1);
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
        destinations,
        setDestinations,
        lastDestinations,
        setLastDestinations,
        loading,
        setLoading,
        destinationsCount,
        setDestinationCount,
        pageDestination,
        setPageDestination,
        userDestinationsCount,
        setUserDestinationCount,
        userPageDestination,
        setUserPageDestination
    };

    const skip = (page) => ((page - 1) * 6);

    useEffect(() => {
        setLoading(true);
        Promise.all([getAll(skip(pageDestination)), getCountries()]).then(([data, countries]) => {
            setDestinations(data.results);
            setDestinationCount(data.count);
            setLastDestinations(data.results.slice(-2));
            setCountries(countries.results);
            setLoading(false);
        });

    }, [pageDestination]);

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
