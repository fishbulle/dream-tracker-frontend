import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { AuthContext } from '../context/AuthContext';
import { deleteDream } from '../api/api';
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
import { DreamType, IDream } from '../utils/dream';
import { color } from '../styles/colors';
import { GenericModal } from './common/GenericModal';
import { SortDreamsByType } from './forms/input/SortDreamsByType';

interface Props {
  dreams: IDream[];
  setDreams: Dispatch<SetStateAction<IDream[]>>;
}

export function MapDreams(props: Props) {
  const { dreams, setDreams } = props;
  const { token, userId } = useContext(AuthContext);
  const [dreamId, setDreamId] = useState<string>('');
  const [dreamTitle, setDreamTitle] = useState<string>('');
  const [selectedType, setSelectedType] = useState<DreamType>(undefined);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setSelectedType(event.target.value as DreamType);
  const [isSendingRequest, setIsSendingRequest] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpdate = (dream: IDream) => {
    navigate(ROUTES.UPDATE_DREAM, {
      state: { dream },
    });
  };

  const handleDelete = async () => {
    setIsSendingRequest(true);
    try {
      const response = await deleteDream(dreamId, userId, token);
      if (response?.status == 200) {
        setDreams(dreams.filter((d) => d.dreamId !== dreamId));
        setIsSendingRequest(false);
        setShowModal(false);
      } else return [];
    } catch (error) {
      console.error(`couldn't delete dream ${error}`);
    }
  };

  const filteredDreams = selectedType
    ? dreams.filter((dream) => dream.type === selectedType)
    : dreams;

  return (
    <>
      <SortDreamsByType
        selectedType={selectedType}
        handleChange={handleChange}
      />
      {filteredDreams.map((dream) => (
        <StyledDiv key={dream.dreamId}>
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
              onClick={() => handleUpdate(dream)}
            >
              <FaPencilAlt />
            </StyledIconButton>
            <StyledIconButton
              aria-label='Press to delete dream'
              onClick={() => {
                setDreamId(dream.dreamId);
                setDreamTitle(dream.title);
                setShowModal(true);
              }}
            >
              <FaRegTrashCan />
            </StyledIconButton>
          </ButtonDiv>
          <GenericModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={dreamTitle}
            body={'are you sure you want to delete this dream?'}
            handleRequest={handleDelete}
            isSendingRequest={isSendingRequest}
          />
        </StyledDiv>
      ))}
    </>
  );
}

const categoryStyle: React.CSSProperties = {
  color: color.orange,
};

const nightmareStyle: React.CSSProperties = {
  fontStyle: 'italic',
  color: color.purple,
};
