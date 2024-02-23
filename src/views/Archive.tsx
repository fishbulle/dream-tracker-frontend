import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllDreamsByUser } from '../api/api';
import { StyledDiv } from '../components/common/styles/styles';
import { NavBar } from '../components/common/NavBar';

export function DreamArchive() {
    const { token, userId } = useContext(AuthContext);

    async function getPreviousDreams() {
        try {
            await getAllDreamsByUser(userId, token).then(res => console.log(res));
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect som hämtar alla sparade drömmar 

    return (
        <>
            <NavBar />
            <StyledDiv>
                <h1>archive</h1>
            </StyledDiv>
        </>
    );
}