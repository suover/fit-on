import styled from 'styled-components';

const CommentItem = styled.div<{ $isReply: boolean; $isExpand: boolean }>`
  padding: 10px 0;
  border-top: 1px solid #f1f1f1;

  &:last-of-type {
    border-bottom: ${(props) => props.$isReply && 0};
  }

  div.commentInfo {
    display: flex;
    align-items: center;

    span:nth-of-type(1) {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      background: #f1f1f1;
      margin-right: 10px;

      svg {
        font-size: 2.5rem;
      }
    }

    span:nth-of-type(2) {
      font-size: 1rem;
      font-weight: bold;
    }

    span:nth-of-type(3) {
      margin-left: auto;
      color: #999;
    }
  }

  p {
    padding-left: 50px;
    margin-bottom: 10px;
  }

  div.control {
    padding-left: 50px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;

    span {
      cursor: pointer;

      &:hover {
        color: #0077b6;
      }
    }

    span:nth-of-type(1) {
      margin-right: 20px;

      svg {
        font-size: 1rem;
        position: relative;
        top: 2px;

        transform: ${(props) => (props.$isExpand ? 'rotate(180deg)' : '')};
      }
    }

    span:nth-of-type(2) {
      margin-right: 20px;
      svg {
        font-size: 0.875rem;
        position: relative;
        top: 2px;
      }
    }

    span:nth-of-type(3) {
      svg {
        font-size: 1.125rem;
      }
    }
  }
`;

export default CommentItem;
