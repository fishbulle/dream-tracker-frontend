import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ButtonDiv, StyledButton, StyledWrapper } from '../styles/styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { messages } from '../utils/messages';
import { RandomCatFact } from '../components/RandomCatFact';
import { getAllDreamsByUser } from '../api/api';
import { IDream } from '../utils/dream';
import { color } from '../styles/colors';

export function Dashboard() {
  const { username, token, userId } = useContext(AuthContext);
  const [dreams, setDreams] = useState<IDream[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPreviousDreams = async () => {
      try {
        const response = await getAllDreamsByUser(userId, token);
        if (response?.status == 200) return response.data;
        else return [];
      } catch (error) {
        console.error(error);
      }
    };

    getPreviousDreams().then((data) => setDreams(data));
  }, [token, userId]);

  const nightmares = (dreams: IDream[]) => {
    const nightmareDreams = dreams.filter((dream) => {
      return dream.type === 'NIGHTMARE';
    });

    return nightmareDreams.length;
  };

  const newDream = () => {
    navigate(ROUTES.NEW_DREAM);
  };

  const oldDreams = () => {
    navigate(ROUTES.ARCHIVE);
  };

  return (
    <>
      <StyledWrapper>
        <h1>
          {messages.dashboard.heading}
          <span style={usernameStyle}>{username}</span>
        </h1>
        <h3>{messages.dashboard.subHeading}</h3>
        <ButtonDiv>
          <StyledButton onClick={newDream}>register new dream</StyledButton>
          <StyledButton onClick={oldDreams}>browse old dreams</StyledButton>
        </ButtonDiv>
      </StyledWrapper>
      <StyledWrapper>
        <h2>{messages.dashboard.stats}</h2>
        <p>
          you have recorded {dreams.length} dreams where
          {' ' + nightmares(dreams) + ' '}
          are nightmares.
        </p>
      </StyledWrapper>
      <StyledWrapper>
        <h2>{messages.dashboard.catFact}</h2>
        <RandomCatFact />
      </StyledWrapper>
    </>
  );
}

const usernameStyle: React.CSSProperties = {
  color: color.pink,
  fontWeight: 'bold',
};
