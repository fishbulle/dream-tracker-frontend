import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '../../views/LandingPage';
import { LoginView } from '../../views/LoginView';
import { RegisterView } from '../../views/RegisterView';
import { Dashboard } from '@mui/icons-material';
import { NewDream } from '../../views/NewDream';
import { DreamArchive } from '../../views/Archive';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ROUTES } from './routes';

export const ApplicationRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);
    
    return (
        <>
            <Routes>
                <Route path={ROUTES.START} element={<LandingPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginView />} />
                <Route path={ROUTES.REGISTER} element={<RegisterView/>}/>
                { isAuthenticated && 
                <>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.NEW_DREAM} element={<NewDream />} />
                    <Route path={ROUTES.ARCHIVE} element={<DreamArchive />} />
                    // settings (update password/email)
                </>
                }
            </Routes>
        </>
    );
};