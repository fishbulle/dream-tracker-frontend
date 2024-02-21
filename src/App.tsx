import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { LandingPage } from './views/LandingPage';
import { RegisterView } from './views/RegisterView';
import { MyPages } from './views/MyPages';

function App() {
    const { isAuthenticated } = useContext(AuthContext);  

    return (
        // can I use sidebar here to get it across all pages?
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginView />} />
                <Route path="/register" element={<RegisterView/>}/>
                { isAuthenticated && 
                <>
                    <Route path='/mypages' element={<MyPages />} />
                    // archive 
                    // new dream
                    // settings (update password/email)
                </>
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
