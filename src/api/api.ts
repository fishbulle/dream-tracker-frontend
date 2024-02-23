import { Dispatch, SetStateAction } from 'react';
import api from './api-root';
import { AxiosResponse } from 'axios';

type UserResponse = {
    token: string,
    userId: string,
    nickname: string
}

export async function registerUser(
    nickname: string,
    email: string,
    password: string
): Promise<AxiosResponse<UserResponse> | undefined> {
    try {
        const response = await api.post(
            '/auth/register',
            {
                nickname: nickname,
                email: email,
                password: password
            }
        );

        return response;
        
    } catch (error) {
        console.error('something went wrong', error);
    }
}

export async function logIn(
    email: string,
    password: string,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    setToken: Dispatch<SetStateAction<string>>,
    setUserId: Dispatch<SetStateAction<string>>,
    setUsername: Dispatch<SetStateAction<string>>
): Promise<AxiosResponse<UserResponse> | undefined> {
    try {
        const response = await api.post(
            '/auth/authenticate',
            {
                email: email,
                password: password
            }
        );

        if (response.status == 200) {
            setIsAuthenticated(true),
            setToken(response.data.token),
            setUserId(response.data.userId),
            setUsername(response.data.nickname);
            
            return response;
        } 
    } catch (error) {
        console.error('something went wrong', error);
    }
}

export async function newDream(
    params: {
    title: string,
    content: string,
    category: string,
    userId: string,
    token: string
   }
) {
    const { token, ...rest } = params;  
    
    try {
        return await api.post(
            '/dreams/create', 
            rest,
            { 
              
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            },
        );
    } catch (error) {
        console.error('something went wrong', error);
    }
}

export async function getAllDreamsByUser(
    userId: string,
    token: string
) {
    try {
        const response = await api.get(
            '/dreams/read', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: userId
                }
            }
        );

        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error('something went wrong', error);
    }
}

export async function updateDream(
    params: {
    dreamId: string,
    userId: string,
    token: string,
    title?: string,
    content?: string,
    category?: string
    }
) {
    const { token, ...rest } = params;  

    try {
        return await api.put(
            '/dreams/update',
            rest,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }
        );
    } catch (error) {
        console.error('something went wrong', error);
    }
}

export async function deleteDream(
    dreamId: string,
    userId: string,
    token: string
) {
    try {
        return await api.delete(
            '/dreams/delete/' + dreamId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: userId
                }
            }
        );
    } catch (error) {
        console.error('something went wrong', error);
    }
}