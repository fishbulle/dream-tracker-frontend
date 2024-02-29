import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ButtonDiv, StyledButton, StyledWrapper } from '../styles/styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { messages } from '../utils/messages';
import { RandomCatFact } from '../components/RandomCatFact';

export function Dashboard() {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  const newDream = () => {
    navigate(ROUTES.NEW_DREAM);
  };

  const oldDreams = () => {
    navigate(ROUTES.ARCHIVE);
  };

  return (
    <>
      <StyledWrapper>
        <h1>{messages.dashboard.heading + username}</h1>
        <h3>{messages.dashboard.subHeading}</h3>
        <ButtonDiv>
          <StyledButton onClick={newDream}>register new dream</StyledButton>
          <StyledButton onClick={oldDreams}>browse old dreams</StyledButton>
        </ButtonDiv>
      </StyledWrapper>
      <StyledWrapper>
        <h2>random cat fact of the day</h2>
        <RandomCatFact />
      </StyledWrapper>
      <StyledWrapper>
        <h2>statistics and numbers</h2>
        <p>
          you have recorded xx dreams where xx are nightmares and xx occurances
        </p>
      </StyledWrapper>
    </>
  );
}
