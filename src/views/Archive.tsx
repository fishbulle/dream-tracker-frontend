import { useContext, useEffect, useState } from 'react';
import { MapDreams } from '../components/MapDreams';
import { StyledWrapper } from '../styles/styles';
import { getAllDreamsByUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { IDream } from '../utils/dream';

export function DreamArchive() {
  const { token, userId } = useContext(AuthContext);
  const [dreams, setDreams] = useState<IDream[]>([]);
  const [updateNeeded, setUpdateNeeded] = useState<boolean>(false);
  const onUpdate = () => setUpdateNeeded((updateNeeded) => !updateNeeded);

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
  }, [token, userId, updateNeeded]);

  return (
    <>
      {/* TODO: add option to sort on nightmare/not nightmare
          add pagination */}
      <StyledWrapper>
        <h1>dream archive</h1>
        <MapDreams dreams={dreams} onUpdate={onUpdate} />
      </StyledWrapper>
    </>
  );
}
