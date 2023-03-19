import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { createItem, getAll, getById, getCountries } from './services/data';


import { UserContext } from './contexts/UserContext';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import SearchForm from './components/SerachForm';
import About from './components/views/About/About';
import Catalog from './components/views/Catalog/Catalog';
import CreateEdit from './components/views/CreateEdit/CreateEdit';
import Details from './components/views/Detaiuls/Details';
import Home from './components/views/Home/Home';
import NotFound from './components/views/NotFound/NotFound';
import Profile from './components/views/Profile/Profile';
import Register from './components/views/Register/Register';
import { login, logout, register } from './services/auth';


function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [countries, setCountries] = useState([]);
  const [currentDestinationId, setCurrentDestinationId] = useState(null);
  const [currentDestination, setCurrentDestination] = useState({});

  const [hasEmptyFeild, setHasEmptyField] = useState(false);

  const [lastDestinations, setLastDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);



  useEffect(() => {
    setLoading(true);
    if (currentDestinationId) {
      getById(currentDestinationId)
        .then(data => {
          setCurrentDestination(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentDestinationId]);


  useEffect(() => {
    setLoading(true);
    Promise.all([getAll(), getCountries()]).then(([data, countries]) => {
      setDestinations(data.results);
      setLastDestinations(data.results.slice(-2));
      setCountries(countries.results);
      setLoading(false);
    });

  }, []);


  function onLoginSubmit(data) {
    login(data)
      .then(newUser => {
        setUser(newUser);
        navigate('/catalog');
      })
      .catch(err => {
        console.log(err);
        setUser(null);
      });
  }

  async function onRegisterSubmit(data) {
    register(data)
      .then(newUser => {
        setUser(newUser);
        navigate('/catalog');
        console.log(user);
      })
      .catch(err => {
        console.log(err.message);
        setUser(null);
      });
  }

  function onLogoutClick(e) {
    e.preventDefault();
    logout(user)
      .then(data => {
        setUser(null);
      });

    navigate('/');
  }

  function onCreateSubmit(data) {
    setHasEmptyField(Object.values(data).includes(''));
    console.log(data);
    if (hasEmptyFeild) {
      navigate('/create');
    } else {
      createItem(data, user)
        .then(({ objectId }) => {
          setDestinations(state => [...state, { ...data, objectId }]);
          setLastDestinations(state => [state.pop(), { ...data, objectId }]);
          navigate('/catalog');
        });
    }
  }

  function setCurrentDestinationIdHandler(id) {
    setCurrentDestinationId(id);
  }

  return (
    <UserContext.Provider value={({ user })}>
      <header>
        <Navigation onLogoutClick={onLogoutClick} />
        {user ? <SearchForm countries={countries} /> : <LoginForm onLoginSubmit={onLoginSubmit} />}
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home loading={loading} lastDestinations={lastDestinations} />} />
          <Route path='/create' element={<CreateEdit countries={countries} onCreateSubmit={onCreateSubmit} hasEmptyFeild={hasEmptyFeild} />} />
          <Route path='/register' element={<Register onRegisterSubmit={onRegisterSubmit} />} />
          <Route path='/catalog' element={<Catalog loading={loading} destinations={destinations} />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/details/:destinationId' element={<Details loading={loading} currentDestination={currentDestination} setCurrentDestinationIdHandler={setCurrentDestinationIdHandler} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </main>
      <footer>
        Blagovest Panayotov
      </footer>
    </UserContext.Provider >
  );
}

export default App;
