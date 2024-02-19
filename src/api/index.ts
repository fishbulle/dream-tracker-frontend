import { Dispatch, SetStateAction } from 'react';
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