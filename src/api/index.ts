import api from './api';

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
    password: string
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
            sessionStorage.setItem('isAuthenticated', 'true'),
            sessionStorage.setItem('token', response.data.token);
        } 
    } catch (error) {
        console.error(error);
    }
}