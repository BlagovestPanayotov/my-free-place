import { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { createItem, getAll } from './services/data';



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


function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState(2);

  const [lastDestinations, setLastDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAll()
      .then(data => {
        setDestinations(Object.values(data));
        setLastDestinations(Object.values(data).slice(-2));
        setLoading(false);
      });
  }, []);

  const [hasEmptyFeild, setHasEmptyField] = useState(false);

  function onCreateSubmit(data) {
    setHasEmptyField(Object.values(data).includes(''));
    if (hasEmptyFeild) {
      navigate('/create');
    } else {
      createItem(data)
        .then(newDestination => {
          setDestinations(state => [...state, newDestination]);
          setLastDestinations(state => [state.pop(), newDestination]);
          navigate('/catalog');
        });
    }

  }

  return (
    <>
      <header>
        <Navigation user={user} />
        {user ? <SearchForm /> : <LoginForm />}
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home loading={loading} lastDestinations={lastDestinations} />} />
          <Route path='/create' element={<CreateEdit onCreateSubmit={onCreateSubmit} hasEmptyFeild={hasEmptyFeild} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/catalog' element={<Catalog loading={loading} destinations={destinations} />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/details/:destinationId' element={<Details />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </main>
      <footer>
        Blagovest Panayotov
      </footer>
    </>
  );
}

export default App;
