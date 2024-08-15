import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import customAxios from '../api/axiosConfig';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  roles: string[];
  sub: string;
  nickname: string;
  userId: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: string | null;
  nickname: string | null;
  userId: number | null;
  name: string | null;
  email: string | null;
  login: (accessToken: string, loginType: string) => void;
  logout: () => void;
  loginType: string | null;
  isLoading: boolean;
  updateAuthState: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userRole: null,
  nickname: null,
  userId: null,
  name: null,
  email: null,
  login: () => {},
  logout: () => {},
  loginType: null,
  isLoading: true,
  updateAuthState: () => {},
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
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (accessToken: string, loginType: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('loginType', loginType);
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    setIsAuthenticated(true);
    setUserRole(decodedToken.roles.includes('ROLE_admin') ? 'admin' : 'user');
    setNickname(decodedToken.nickname);
    setLoginType(loginType);
    setUserId(decodedToken.userId);
    setName(decodedToken.name);
    setEmail(decodedToken.sub);
    customAxios.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('loginType');
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('kakao_')) {
          localStorage.removeItem(key);
        }
      });
      setIsAuthenticated(false);
      setUserRole(null);
      setNickname(null);
      setLoginType(null);
      setUserId(null);
      setName(null);
      setEmail(null);
      delete customAxios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const updateAuthState = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const storedLoginType = localStorage.getItem('loginType');

    if (accessToken && storedLoginType) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Access Token이 만료되었을 경우, 갱신 시도
          const refreshTokenResponse = await axios.post('/api/auth/refresh');
          const newAccessToken = refreshTokenResponse.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          customAxios.defaults.headers.common['Authorization'] =
            `Bearer ${newAccessToken}`;
          const newDecodedToken = jwtDecode<DecodedToken>(newAccessToken);
          setIsAuthenticated(true);
          setUserRole(
            newDecodedToken.roles.includes('ROLE_admin') ? 'admin' : 'user',
          );
          setNickname(newDecodedToken.nickname);
          setLoginType(storedLoginType);
          setUserId(newDecodedToken.userId);
          setName(newDecodedToken.name);
          setEmail(newDecodedToken.sub);
        } else {
          // Token이 유효할 경우 상태 업데이트
          setIsAuthenticated(true);
          setUserRole(
            decodedToken.roles.includes('ROLE_admin') ? 'admin' : 'user',
          );
          setNickname(decodedToken.nickname);
          setLoginType(storedLoginType);
          setUserId(decodedToken.userId);
          setName(decodedToken.name);
          setEmail(decodedToken.sub);
          customAxios.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('Failed to decode or refresh token', error);
        logout();
      }
    } else {
      logout();
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    updateAuthState();

    const handleTokenRefresh = () => {
      updateAuthState();
    };

    window.addEventListener('tokenRefreshed', handleTokenRefresh);
    return () => {
      window.removeEventListener('tokenRefreshed', handleTokenRefresh);
    };
  }, [updateAuthState]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        nickname,
        userId,
        name,
        email,
        login,
        logout,
        loginType,
        isLoading,
        updateAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
