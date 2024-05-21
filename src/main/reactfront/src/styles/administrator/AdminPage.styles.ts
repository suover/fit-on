import styled from 'styled-components';

export const AdminContainer = styled.div`
  display: flex;
  height: 800px;
`;

export const SidebarContainer = styled.div`
  position: sticky;
  top: 0px;
  margin-left: 60px;
  margin-right: 20px;
  width: 400px;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  height: 700px;
  width: auto;
  margin-right: 270px;
  flex-grow: 1; // 나머지 공간을 모두 차지
  display: flex;
  align-items: center; // 내용을 수직 중앙에 배치
  justify-content: center; // 내용을 수평 중앙에 배치
`;
