import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { LandingPage } from './views/LandingPage';
import { RegisterView } from './views/RegisterView';
import { MyPages } from './views/MyPages';
import { DreamArchive } from './views/Archive';
import { NavBar } from './components/common/NavBar';
import { Background } from './components/common/Background';
import { NewDream } from './views/NewDream';

function App() {
    const { isAuthenticated } = useContext(AuthContext);  

    return (
        <BrowserRouter>
            <Background>
                <NavBar />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/login' element={<LoginView />} />
                    <Route path="/register" element={<RegisterView/>}/>
                    { isAuthenticated && 
                <>
                    <Route path='/mypages' element={<MyPages />} />
                    <Route path='/newdream' element={<NewDream />} />
                    <Route path='/archive' element={<DreamArchive />} />
                    // settings (update password/email)
                </>
                    }
                </Routes>
            </Background>
        </BrowserRouter>
    );
}

export default App;
