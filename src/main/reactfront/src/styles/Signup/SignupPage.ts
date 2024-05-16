import styled from 'styled-components';

export const SignupForm = styled.div`
  width: 500px; // 로그인 폼의 폭을 설정.
  height: 100vh; // 뷰포트의 전체 높이를 설정
  margin: 0 auto; // 좌우 중앙 정렬
  display: flex;
  flex-direction: column;
  justify-content: center; // 세로 방향에서 중앙 정렬
  align-items: center; // 가로 방향에서 중앙 정렬
`;

export const SignupButtons = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  height: 45px;
  width: 100%;
`;
