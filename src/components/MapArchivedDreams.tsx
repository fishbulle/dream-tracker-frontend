import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllDreamsByUser } from '../api/api';
import { FaPencilAlt } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import {
  ButtonDiv,
  StyledDiv,
  StyledIconButton,
  StyledInnerDiv,
} from '../styles/styles';
import { ROUTES } from '../routes/routes';
import { convertType } from '../utils/convert-type';

interface IDream {
  dreamId: string;
  title: string;
  content: string;
  category: string;
  type: string;
}

export function MapDreams() {
  const { token, userId } = useContext(AuthContext);
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

  return (
    <>
      {dreams.map((dream, index) => (
        <StyledDiv key={index}>
          <h1>{dream.title.toLowerCase()}</h1>
          <StyledInnerDiv>
            <p>{dream.content.toLowerCase()}</p>
          </StyledInnerDiv>
          <p>
            <span style={categoryStyle}>{dream.category.toUpperCase()}</span>
            <span style={nightmareStyle}>{convertType(dream.type)}</span>
          </p>
          <ButtonDiv>
            <StyledIconButton
              aria-label='Press to edit dream'
              onClick={() =>
                navigate(ROUTES.UPDATE_DREAM, { state: { dream } })
              }
            >
              <FaPencilAlt />
            </StyledIconButton>
            <StyledIconButton
              aria-label='Press to delete dream'
              onClick={() => console.log('Deleted.. but not really (yet)')}
            >
              <FaRegTrashCan />
            </StyledIconButton>
          </ButtonDiv>
        </StyledDiv>
      ))}
    </>
  );
}

const categoryStyle: React.CSSProperties = {
  color: '#FFBA86',
};

const nightmareStyle: React.CSSProperties = {
  fontStyle: 'italic',
  color: '#79155B',
};
