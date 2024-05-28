import React from 'react';
import styled from 'styled-components';
import CommentListItem from './CommentListItem';
import { Comment } from '../../../types/MainDummyData';
import CommentInputField from './CommentInputField';

const CommentHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments = [] }) => {
  return (
    <>
      <CommentHeading>댓글</CommentHeading>
      <CommentInputField />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </>
  );
};

export default CommentList;
