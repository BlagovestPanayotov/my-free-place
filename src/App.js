import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



//  import LoginForm from './components/LoginForm';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import SearchForm from './components/SerachForm';
// import AboutPage from './components/views/AboutPage';
// import CreateEdit from './components/views/CreateEdit';
import HomePage from './components/views/HomePage';
// import Register from './components/views/Register';


function App() {

  const [user, setUser] = useState(null);

  return (
    <>
      <header>
        <Navigation />
        {user ? <SearchForm /> : <LoginForm />}
      </header>
      <main>
        <HomePage />
        {/* <CreateEdit /> */}
        {/* <Register /> */}
        {/* <AboutPage /> */}
      </main>
      <footer>
        Blagovest Panayotov
      </footer>
    </>
  );
}

export default App;
