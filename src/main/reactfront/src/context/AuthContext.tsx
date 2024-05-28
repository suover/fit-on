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
  login: (
    token: string,
    roles: string[],
    nickname: string,
    loginType: string,
  ) => void;
  logout: () => void;
  loginType: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userRole: null,
  nickname: null,
  login: () => {},
  logout: () => {},
  loginType: null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [loginType, setLoginType] = useState<string | null>(null);

  const login = (
    token: string,
    roles: string[],
    nickname: string,
    loginType: string,
  ) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('loginType', loginType);
    setIsAuthenticated(true);
    setUserRole(roles.includes('ROLE_admin') ? 'admin' : 'user');
    setNickname(nickname);
    setLoginType(loginType);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('nickname');
    localStorage.removeItem('loginType');
    setIsAuthenticated(false);
    setUserRole(null);
    setNickname(null);
    setLoginType(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRoles = localStorage.getItem('roles');
    const storedNickname = localStorage.getItem('nickname');
    const storedLoginType = localStorage.getItem('loginType');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(
            decodedToken.roles.includes('ROLE_admin') ? 'admin' : 'user',
          );
          setNickname(decodedToken.nickname);
          setLoginType(storedLoginType);
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
      value={{ isAuthenticated, userRole, nickname, login, logout, loginType }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
