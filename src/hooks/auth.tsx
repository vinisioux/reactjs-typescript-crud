import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';
import { toast } from 'react-toastify';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: {
    email: string;
  };
  signIn(credentials: SignInCredentials): void;
  signOut(): void;
}

interface AuthState {
  token: string;
  email: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@2sow:token');
    const email = localStorage.getItem('@2sow:email');

    if (token && email) {
      return { token, email };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(({ email, password }) => {
    if (password.length <= 4) {
      toast.error('Tamanho da senha inválido');
      return;
    }

    const token = uuid();

    localStorage.setItem('@2sow:token', token);
    localStorage.setItem('@2sow:email', email);

    setData({ token, email });

    toast.success('Login realizado!');
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@2sow:token');
    localStorage.removeItem('@2sow:email');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: { email: data.email }, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
