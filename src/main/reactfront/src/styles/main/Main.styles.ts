import styled from 'styled-components';
import bannerImg from '../../assets/banner.jpg';

const MainBanner = styled.section`
  width: 100%;
  height: 500px;
  background: url(${bannerImg}) no-repeat center center;
  margin-bottom: 100px;
`;

const TitleBox = styled.div`
  margin-bottom: 10px;

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

const BestItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Btns = styled.div`
  width: 18%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export { MainBanner, TitleBox, BestItemHeader, Btns };
