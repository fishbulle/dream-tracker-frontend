import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
}

const defaultAuthContext: IAuthContext = {
  isAuthenticated: false,
  setIsAuthenticated: () => {
  },
  userId: '',
  setUserId: () => {
  },
  username: '',
  setUsername: () => {
  }
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ userId, setUserId ] = useState('');
  const [ username, setUsername ] = useState('');

  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userId,
    setUserId,
    username,
    setUsername
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};