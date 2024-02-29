import { useEffect, useState } from 'react';
import { getCatFact } from '../api/api';

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
      <p>{catFact.toLowerCase()}</p>
    </>
  );
}
