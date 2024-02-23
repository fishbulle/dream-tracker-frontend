import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { LandingPage } from './views/LandingPage';
import { RegisterView } from './views/RegisterView';
import { Dashboard } from './views/Dashboard';
import { DreamArchive } from './views/Archive';
import { Background } from './components/common/Background';
import { NewDream } from './views/NewDream';
import { NavBar } from './components/common/NavBar';

function App() {
    const { isAuthenticated } = useContext(AuthContext);  

    return (
        <>
            <NavBar />
            <Background>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/login' element={<LoginView />} />
                    <Route path="/register" element={<RegisterView/>}/>
                    { isAuthenticated && 
                <>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/newdream' element={<NewDream />} />
                    <Route path='/archive' element={<DreamArchive />} />
                    // settings (update password/email)
                </>
                    }
                </Routes>
            </Background>
        </>
    );
}

export default App;
