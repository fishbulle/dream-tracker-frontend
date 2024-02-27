import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllDreamsByUser } from '../api/api';

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

            {/*  TODO move styles to styles file */}

            {dreams.map((dream, index) => (
                <div key={index} style={{ backgroundColor: '#0a0a0a', color:'#c1bfbf', margin: '20px', padding:'20px', borderRadius: '25px' }}>
                    <h1>
                        {dream.title}
                    </h1>
                    <p>
                        {dream.content}
                    </p>
                    <p style={{ fontStyle: 'italic', color: '#FFBA86' }}>
                        {dream.category}
                    </p>
                </div>
            ))}
        </>
    );
}