import styled from 'styled-components';

export const LoginForm = styled.div`
  width: 500px;
  height: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  box-sizing: border-box;
`;

export const LoginButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const SocialIcon = styled.div`
  margin: 0 20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  padding: 20px 0;
`;
