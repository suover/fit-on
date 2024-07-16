import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

interface PrivateRouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const { isAuthenticated, userRole, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // 로딩 중일 때는 아무 것도 렌더링하지 않음
    return null;
  }

  if (!isAuthenticated) {
    // 사용자가 인증되지 않았을 경우 로그인 페이지로 리디렉션
    return <Navigate to="/sign-in" />;
  }

  if (roles && userRole && !roles.includes(userRole)) {
    // 사용자가 필요한 역할을 가지지 않았을 경우 접근 거부 페이지로 리디렉션
    return <Navigate to="/not-found" />;
  }

  // 조건을 만족하면 자식 컴포넌트를 렌더링
  return <Outlet />;
};

export default PrivateRoute;
