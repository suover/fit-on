import styled from 'styled-components';

const PostWrapper = styled.div`
  width: 100%;

  span {
    font-size: 0.875rem;

    svg {
      font-size: 0.75rem;
      position: relative;
      top: 1px;
    }
  }

  h2 {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  div.postInfo {
    display: flex;
    justyfy-content: space-between;
    align-items: center;
    padding: 0 5px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999;
    margin-bottom: 10px;

    span:nth-of-type(1) {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      background: #f1f1f1;
      margin-right: 10px;

      svg {
        font-size: 2.25rem;
      }
    }

    span:nth-of-type(2) {
      font-size: 1.25rem;
    }

    span:nth-of-type(3) {
      margin-left: auto;
      margin-right: 20px;
    }
  }

  div.content {
    padding: 10px;
    word-break: normal;
    line-height: 2rem;
    margin-bottom: 20px;
  }
`;

export default PostWrapper;
