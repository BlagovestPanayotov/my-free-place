import { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';


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

  const [user, setUser] = useState(2);

  return (
    <>
      <header>
        <Navigation user={user} />
        {user ? <SearchForm /> : <LoginForm />}
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateEdit />} />
          <Route path='/register' element={<Register />} />
          <Route path='/catalog' element={<Catalog />} />
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
