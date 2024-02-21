import { Dispatch, SetStateAction } from 'react';
import api from './api-root';

export async function registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
) {
    try {
        return await api.post(
            '/auth/register',
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        );
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function logIn(
    email: string,
    password: string,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    setToken: Dispatch<SetStateAction<string>>,
    setUserId: Dispatch<SetStateAction<string>>,
    setUsername: Dispatch<SetStateAction<string>>
) {
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
            setUsername(response.data.username);
            return response;
        } 
    } catch (error) {
        console.error(error);
    }
}

export async function newDream(
    title: string,
    content: string,
    category: string,
    tags: string[],
    userId: string,
    token: string
) {
    try {
        return await api.post(
            '/dreams/create', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                title: title,
                content: content,
                category: category,
                tags: tags,
                userId: userId
            }
        );
    } catch (error) {
        console.error(error);
        return error;
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
        console.error(error);
        return error;
    }
}

export async function updateDream(
    dreamId: string,
    userId: string,
    token: string,
    title?: string,
    content?: string,
    category?: string,
    tags?: string[],
) {
    try {
        return await api.put(
            '/dreams/update', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                dreamId: dreamId,
                userId: userId,
                title: title,
                content: content,
                category: category,
                tags: tags
            }
        );
    } catch (error) {
        console.error(error);
        return error;
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
        console.error(error);
        return error;
    }
}