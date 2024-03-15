import { useContext } from 'react';
import { StyledLogOutButton } from '../styles/styles';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { HiOutlineLogout } from 'react-icons/hi';

export const LogOut = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsAuthenticated(false);
    navigate(ROUTES.START);
  };

  return (
    <>
      <StyledLogOutButton onClick={handleLogOut}>
        <HiOutlineLogout />
      </StyledLogOutButton>
    </>
  );
};
