import styled from 'styled-components';

const PostWrapper = styled.div`
  width: 100%;

  span {
    font-size: 1rem;
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
    align-items: center;
    padding: 0 5px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999;
    margin-bottom: 10px;
    margin-top: 15px;

    .icon {
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
  }
  .infos {
    display: flex;
    margin-left: auto;
    font-weight: bold;
    gap: 15px;
  }
  .post-meta {
    display: flex;
    margin-left: auto;
    gap: 20px;
  }
  div.content {
    padding: 10px;
    word-break: normal;
    line-height: 2rem;
    margin-bottom: 20px;
  }
`;

const BackBtn = styled.button`
  width: 80px;
  height: 40px;
  background: transparent;
  border: 1px solid #777;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #333;
    color: #fff;
  }
`;

const RedBtn = styled.button`
  width: 80px;
  height: 40px;
  background: transparent;
  border: 1px solid #777;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  color: red;

  &:hover {
    background: #333;
    color: #fff;
  }
`;

export { PostWrapper, BackBtn, RedBtn };
