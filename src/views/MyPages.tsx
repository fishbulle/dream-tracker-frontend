import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';

export function MyPages() {
    const { token, userId, username } = useContext(AuthContext);

    // useEffect som hämtar alla sparade drömmar 

    return (
        <>
            <StyledDiv>
                <h1> welcome {username}</h1>
            </StyledDiv>
        </>
    );
}

const StyledDiv = styled.div`
    
    background-color: rgba(250, 250, 250, 0.8);
    padding: 50px;
    margin: 100px;
    color: #000000; 
`;