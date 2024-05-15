import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const MainBody = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 5px;
`;

export const Col = styled.div<{ size: number }>`
  flex: 0 0 ${(props) => `${props.size}%`};
  max-width: ${(props) => `${props.size}%`};
  padding: 0 10px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
`;

export const CardBody = styled.div`
  padding: 20px;
  p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const UserImage = styled.img`
  width: 100px;
  border-radius: 50%;
`;

export const FormLabel = styled.label`
  display: block;
  margin-top: 10px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const ButtonPrimary = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonOutlined = styled.button`
  background-color: transparent;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;
