import { useContext, useEffect, useState } from 'react';
import { getAllDreamsByUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { IDream } from '../utils/dream';
import { StyledWrapper } from '../styles/styles';
import { messages } from '../utils/messages';

export function Statistics() {
  const { token, userId } = useContext(AuthContext);
  const [dreams, setDreams] = useState<IDream[]>([]);

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

  return (
    <>
      <StyledWrapper>
        <h2>{messages.dashboard.stats}</h2>
        <p>
          you have recorded {dreams.length} dreams where
          {' ' + nightmares(dreams) + ' '}
          are nightmares.
        </p>
      </StyledWrapper>
    </>
  );
}
