import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { LoginView } from './components/views/LoginView';
import { LandingPage } from './components/views/LandingPage';
import { RegisterView } from './components/views/RegisterView';

function App() {
    const { isAuthenticated } = useContext(AuthContext);  

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginView />} />
                <Route path="/register" element={<RegisterView/>}/>
                { isAuthenticated && 
        <>
          // TODO add routes for authenticated views (my pages)
        </>
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
