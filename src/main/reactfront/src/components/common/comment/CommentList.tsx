import React from 'react';

import styled from 'styled-components';
import CommentListItem from './CommentListItem';
import CommentInputField from './CommentInputField';

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  nickname: string;
}

const CommentHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentList: React.FC<{
  comments: Comment[];
  route: string;
  postId: string;
  idName: string;
  addComment: (comment: Comment) => void;
}> = ({ comments, route, postId, idName, addComment }) => {
  const addedComment = (comment: Comment): void => {
    addComment(comment);
    console.log(comment);
  };

  return (
    <>
      <CommentHeading>댓글</CommentHeading>
      <CommentInputField
        route={route}
        postId={postId}
        idName={idName}
        addComment={addedComment}
      />
      {comments.map((comment) => (
        <CommentListItem
          key={comment.commentId}
          comment={comment}
          route={route}
          postId={postId}
          idName={idName}
        />
      ))}
    </>
  );
};

export default CommentList;
