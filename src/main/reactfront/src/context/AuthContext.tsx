import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  roles: string[];
  sub: string;
  nickname: string;
  userId: number;
  name: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: string | null;
  nickname: string | null;
  userId: number | null;
  name: string | null;
  login: (
    token: string,
    roles: string[],
    nickname: string,
    loginType: string,
    userId: number,
    name: string,
  ) => void;
  logout: () => void;
  loginType: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userRole: null,
  nickname: null,
  userId: null,
  name: null,
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
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);

  const login = (
    token: string,
    roles: string[],
    nickname: string,
    loginType: string,
    userId: number,
    name: string,
  ) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('loginType', loginType);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('name', name);
    setIsAuthenticated(true);
    setUserRole(roles.includes('ROLE_admin') ? 'admin' : 'user');
    setNickname(nickname);
    setLoginType(loginType);
    setUserId(userId);
    setName(name);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('nickname');
    localStorage.removeItem('loginType');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    setIsAuthenticated(false);
    setUserRole(null);
    setNickname(null);
    setLoginType(null);
    setUserId(null);
    setName(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRoles = localStorage.getItem('roles');
    const storedNickname = localStorage.getItem('nickname');
    const storedLoginType = localStorage.getItem('loginType');
    const storedUserId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');

    if (
      token &&
      storedRoles &&
      storedNickname &&
      storedLoginType &&
      storedUserId &&
      storedName
    ) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(
            decodedToken.roles.includes('ROLE_admin') ? 'admin' : 'user',
          );
          setNickname(decodedToken.nickname);
          setLoginType(storedLoginType);
          setUserId(parseInt(storedUserId, 10));
          setName(storedName);
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
      value={{
        isAuthenticated,
        userRole,
        nickname,
        userId,
        name,
        login,
        logout,
        loginType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
