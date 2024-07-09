import React from 'react';
import styled from 'styled-components';
import CommentListItem from './CommunityCommentListItem';
import CommentInputField from '../common/comment/CommentInputField';

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  nickname: string;
  parentCommentId?: number;
}

const CommentHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentList: React.FC<{
  comments: Comment[]; //comments가 undefined인 경우 빈 배열을 기본값으로 사용하도록 설정
  route: string;
  postId: string;
  idName: string;
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, content: string) => void;
}> = ({
  comments = [],
  route,
  postId,
  idName,
  addComment,
  deleteComment,
  updateComment,
}) => {
  const addedComment = (comment: Comment): void => {
    addComment(comment);
    console.log(comment);
  };

  const handleUpdateComment = (commentId: number, content: string): void => {
    updateComment(commentId, content);
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
          deleteComment={deleteComment}
          updateComment={handleUpdateComment}
        />
      ))}
    </>
  );
};

export default CommentList;
