import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  roles: string[];
  sub: string;
  nickname: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: string | null;
  nickname: string | null;
  login: (token: string, roles: string[], nickname: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userRole: null,
  nickname: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  const login = (token: string, roles: string[], nickname: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUserRole(roles.includes('ROLE_admin') ? 'admin' : 'user');
    setNickname(nickname);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
    setNickname(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(
            decodedToken.roles.includes('ROLE_admin') ? 'admin' : 'user',
          );
          setNickname(decodedToken.nickname);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          logout();
        }
      } catch (error) {
        console.error('Failed to decode token', error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, nickname, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
