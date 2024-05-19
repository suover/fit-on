import React from 'react';

import styled from 'styled-components';
import CommentListItem from './CommentListItem';
import { comments } from '../../types/MainDummyData';
import CommentInputField from './CommentInputField';

const CommentHeading = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentList: React.FC = () => {
  return (
    <>
      <CommentHeading>댓글</CommentHeading>
      <CommentInputField />
      {comments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
