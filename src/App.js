import { Routes, Route, useNavigate } from 'react-router-dom';

import About from './components/views/About/About';
import Catalog from './components/views/Catalog/Catalog';
import Create from './components/views/Create/Create';
import Details from './components/views/Detaiuls/Details';
import Home from './components/views/Home/Home';
import NotFound from './components/views/NotFound/NotFound';
import Profile from './components/views/Profile/Profile';
import Register from './components/views/Register/Register';
import MyDestinations from './components/views/Catalog/MyDestinations';
import Header from './components/views/Header/Header';

import { DestinationsProvider } from './contexts/DestinationsContext';
import { UserProvider } from './contexts/UserContext';
import { UserGuard } from './components/guards/UserGuard';
import { NotUserGuard } from './components/guards/NotUserGuard';
import ErrorBoundary from './components/views/ErrorBoundary';
import { Snake } from './games/Snake/Snake';
import FreeTime from './components/views/FreeTime/FreeTime';


function App() {

    const navigate = useNavigate();

    return (
        <ErrorBoundary>
            <UserProvider>
                <DestinationsProvider>
                    <header>
                        <Header navigate={navigate} />
                    </header>
                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route element={<UserGuard />}>
                                <Route path='/my-destinations' element={<MyDestinations />} />
                                <Route path='/:destinationId/details/' element={<Details />} />
                                <Route path='/create' element={<Create navigate={navigate} />} />
                                <Route path='/profile' element={<Profile navigate={navigate} />} />
                                <Route path='free-time' element={<FreeTime />} />
                            </Route>
                            <Route element={<NotUserGuard />}>
                                <Route path='/register' element={<Register navigate={navigate} />} />
                            </Route>
                            <Route path='/about' element={<About navigate={navigate} />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </main>
                    <footer>
                        Blagovest Panayotov
                    </footer>
                </DestinationsProvider>
            </UserProvider>
        </ErrorBoundary>
    );
}

export default App;
