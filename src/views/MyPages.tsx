import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllDreamsByUser } from '../api/api';
import { Button } from 'react-bootstrap';

export function MyPages() {
    const { token, userId, username } = useContext(AuthContext);

    // useEffect som hämtar alla sparade drömmar 

    return (
        <>
            <div>
                <h1>
                    welcome {username}
                </h1>
            </div>
        </>
    );
}