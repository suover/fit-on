import styled from 'styled-components';

export const StyledProductDetail = styled.div`
  width: 500px;
  height: 414px;
`;

export const TopContainer = styled.div`
  width: 100%;

  div.productHeading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;

    h2 {
      white-space: nowrap; //두줄 되는거 방지
      font-size: 1.5rem;
      font-weight: bold;
    }

    button {
      border-radius: 40px;

      &:first-of-type {
        margin-right: 3px;
      }
    }
  }

  p.description {
    margin-bottom: 10px;
  }

  p.price {
    font-size: 1.25rem;
    font-weight: bold;
    padding-bottom: 15px;
    border-bottom: 1px solid #333;
    margin-bottom: 15px;
  }
`;

export const StyledRating = styled.div`
  display: flex;
  justify-content: flex-first;
  margin-bottom: 10px;
  font-size: 0.75rem;
  font-weight: 400;

  p {
    margin-left: 5px;
  }
`;

export const InfoContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const ShippingContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 1.1em;
  font-weight: bold;

  p.totalPrice {
    color: red;
  }
`;
export const Btns = styled.span`
  display: flex;
  gap: 5px;
`;
