import styled from 'styled-components';
import banner from '../../assets/img/info/infobanner1.jpg';

const InfoSection = styled.section`
  width: 100%;
  padding: 50px 0 100px 0;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: url(${banner}) no-repeat center center;
  margin-bottom: 50px;
  font-size: 1.875rem;
  color: #fff;
  font-weight: bold;
  letter-spacing: 0.3rem;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgb(0, 0, 0, 0.5);
  }

  p {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
`;

export { InfoSection, ImgWrapper };
