import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ButtonDiv, StyledButton, StyledDiv } from '../styles/styles';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const { username } = useContext(AuthContext);
    const navigate = useNavigate();

    const newDream = () => {
        navigate('/newdream');
    };

    const oldDreams = () => {
        navigate('/archive');
    };

    return (
        <>
            <StyledDiv>
                <h1>welcome {username}</h1>
                <h3>what do you want to do today?</h3>
                <ButtonDiv>
                    <StyledButton onClick={newDream}>register new dream</StyledButton>
                    <StyledButton onClick={oldDreams}>browse old dreams</StyledButton>
                </ButtonDiv>
            </StyledDiv>
        </>
    );
}