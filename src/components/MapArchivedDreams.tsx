import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllDreamsByUser } from '../api/api';
import { StyledDiv } from '../styles/styles';

interface IDream {
    dreamId: string
    title: string
    content: string
    category: string
}

export function MapDreams() {
    const { token, userId } = useContext(AuthContext);
    const [ dreams, setDreams ] = useState<IDream[]>([]);

    
    useEffect(() => {
        const getPreviousDreams = async () => {
            try {
                const response = await getAllDreamsByUser(userId, token);
    
                if (response?.status == 200)
                    return response.data;
                else
                    return [];
            } catch (error) {
                console.error(error);
            }
        };

        getPreviousDreams()
            .then(data => setDreams(data));

    }, [ token, userId ]);

    return (
        <>
            {dreams.map((dream, index) => (
                <>
                    <h1 key={index}>
                        {dream.title}
                    </h1>
                    <p>
                        {dream.content}
                    </p>
                    <p>
                        {dream.category}
                    </p>
                </>
            ))}
        </>
    );
}