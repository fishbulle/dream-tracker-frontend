import { useEffect, useState } from 'react';
import { getCatFact } from '../api/api';
import { StyledWrapper } from '../styles/styles';
import { messages } from '../utils/messages';

export function RandomCatFact() {
  const [catFact, setCatFact] = useState('');

  useEffect(() => {
    const getRandomCatFact = async () => {
      try {
        const response = await getCatFact();

        if (response?.status == 200) return response.data.fact;
        else return setCatFact('no cat fact today :(');
      } catch (error) {
        console.error(error);
      }
    };

    getRandomCatFact().then((data) => setCatFact(data));
  }, []);

  return (
    <>
      <StyledWrapper>
        <h2>{messages.dashboard.catFact}</h2>
        <p>{catFact.toLowerCase()}</p>
      </StyledWrapper>
    </>
  );
}
