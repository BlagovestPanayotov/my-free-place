import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAll, getCountries, getMyItems } from './services/data';


import { UserContext } from './contexts/UserContext';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import SearchForm from './components/SerachForm';
import About from './components/views/About/About';
import Catalog from './components/views/Catalog/Catalog';
import Create from './components/views/Create/Create';
import Details from './components/views/Detaiuls/Details';
import Home from './components/views/Home/Home';
import NotFound from './components/views/NotFound/NotFound';
import Profile from './components/views/Profile/Profile';
import Register from './components/views/Register/Register';
import { DestinationsContext } from './contexts/DestinationsContext';
import Edit from './components/views/Edit/Edit';
import MyDestinations from './components/views/Catalog/MyDestinations';


function App() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userDestinations, setUserDestination] = useState([]);
    const [countries, setCountries] = useState([]);

    const [currentDestinationId, setCurrentDestinationId] = useState(null);
    const [currentDestination, setCurrentDestination] = useState({});


    const [destinations, setDestinations] = useState([]);
    const [lastDestinations, setLastDestinations] = useState([]);
    const [loading, setLoading] = useState(false);

    const destinationsContext = {
        currentDestinationId,
        setCurrentDestinationId,
        currentDestination,
        setCurrentDestination,
        destinations,
        setDestinations,
        lastDestinations,
        setLastDestinations
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
        <UserContext.Provider value={({ user, setUser })}>
            <header>
                <Navigation navigate={navigate} />
                {user ?
                    <DestinationsContext.Provider value={destinationsContext}>
                        <SearchForm countries={countries} navigate={navigate} />
                    </DestinationsContext.Provider>
                    : <LoginForm navigate={navigate} />}
            </header>
            <main>
                <Routes>
                    <Route path='/register' element={<Register navigate={navigate} />} />
                    <Route path='/my-destinations' element={<MyDestinations loading={loading} userDestinations={userDestinations} />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/' element={
                        <DestinationsContext.Provider value={destinationsContext}>
                            <Home loading={loading} />
                        </DestinationsContext.Provider>
                    } />
                    <Route path='/create' element={
                        <DestinationsContext.Provider value={destinationsContext}>
                            <Create countries={countries} navigate={navigate} />
                        </DestinationsContext.Provider>
                    } />
                    <Route path='/catalog' element={
                        <DestinationsContext.Provider value={destinationsContext}>
                            <Catalog loading={loading} />
                        </DestinationsContext.Provider>
                    } />
                    <Route path='/details/:destinationId' element={
                        <DestinationsContext.Provider value={destinationsContext}>
                            <Details loading={loading} />
                        </DestinationsContext.Provider>
                    } />
                    <Route path='/edit/:destinationId' element={
                        <DestinationsContext.Provider value={destinationsContext}>
                            <Edit loading={loading} countries={countries} navigate={navigate} />
                        </DestinationsContext.Provider>
                    } />
                </Routes>
            </main>
            <footer>
                Blagovest Panayotov
            </footer>
        </UserContext.Provider >
    );
}

export default App;
