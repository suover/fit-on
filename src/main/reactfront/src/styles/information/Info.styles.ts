import styled from 'styled-components';
import banner from '../../assets/img/information/infobanner1.jpg';

const InfoSection = styled.section`
  width: 100%;
  min-height: 700px;
  padding: 50px 0 80px 0;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: url(${banner}) no-repeat center center;
  margin-bottom: 25px;
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

const NoContentWrapper = styled.div`
  padding-top: 200px;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
`;

const TabBtns = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 25px;

  button {
    padding: 5px 15px;
    border-radius: 8px;
    background: #f1f1f1;
    transition: all 0.4s;
    cursor: pointer;

    &:hover,
    &.active {
      background: #555;
      color: #fff;
    }
  }
`;

export { InfoSection, NoContentWrapper, ImgWrapper, TabBtns };
