import React from 'react';
import styled from 'styled-components';
import CommunityCommentListItem from './CommunityCommentListItem';
import CommunityCommentInputField from './CommunityCommentInputField';
import { Comment } from '../../types/CommentTypes';

const CommentHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommunityCommentList: React.FC<{
  comments: Comment[];
  route: string;
  postId: string;
  idName: string;
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, content: string) => void;
}> = ({
  comments,
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
      <CommunityCommentInputField
        route={route}
        postId={postId}
        idName={idName}
        addComment={addedComment}
      />
      {comments.map((comment) => (
        <CommunityCommentListItem
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

export default CommunityCommentList;
