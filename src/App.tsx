import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Background } from './components/common/Background';
import { NavBar } from './components/common/NavBar';
import { ApplicationRoutes } from './routes/ApplicationRoutes';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { username, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <NavBar username={username} isAuthenticated={isAuthenticated} />
      <Background>
        <ApplicationRoutes />
      </Background>
    </>
  );
}

export default App;
