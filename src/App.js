import { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';


import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import SearchForm from './components/SerachForm';
import About from './components/views/About/About';
import Catalog from './components/views/Catalog/Catalog';
import CreateEdit from './components/views/CreateEdit/CreateEdit';
import Home from './components/views/Home/Home';
import Profile from './components/views/Profile/Profile';
import Register from './components/views/Register/Register';


function App() {

  const [user, setUser] = useState(1);

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
        </Routes>

      </main>
      <footer>
        Blagovest Panayotov
      </footer>
    </>
  );
}

export default App;
