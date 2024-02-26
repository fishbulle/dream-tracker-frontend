import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Background } from './components/common/Background';
import { NavBar } from './components/common/NavBar';
import { ApplicationRoutes } from './components/routes/ApplicationRoutes';

function App() {  

    return (
        <>
            <Background>
                <NavBar />
                <ApplicationRoutes />
            </Background>
        </>
    );
}

export default App;
