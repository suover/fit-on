import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Comment } from './CommentList';
import StyledCommentItem from './StyledCommentItem';
import CommentInputField from './CommentInputField';

const CommentWrapper = styled.div`
  width: 100%;
`;

const ReplyWrapper = styled.div`
  padding-left: 60px;
`;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const CommentListItem: React.FC<{
  comment: Comment;
  route: string;
  postId: string;
  idName: string;
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, content: string) => void;
}> = ({ comment, route, postId, idName, deleteComment, updateComment }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [countReplies, setCountReplies] = useState<number>(0);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await axiosInstance.get<Comment[]>(
          `${route}/${comment.commentId}/replies`,
        );
        setReplies(res.data);
        setCountReplies(res.data.length);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchReplies();
  }, [route, comment.commentId]);

  const addedReplies = (reply: Comment) => {
    setReplies([...replies, reply]);
    setCountReplies((prevCount) => (prevCount || 0) + 1);
  };

  const handleShowReply = () => {
    setShowReplies((prevState) => !prevState);
  };

  const handleDelete = async (commentId: number) => {
    try {
      const response = await axiosInstance.delete(
        `${route}/${commentId}/delete`,
      );
      if (response.status === 200) {
        deleteComment(commentId);
        setReplies((prevReplies) =>
          prevReplies.filter((reply) => reply.commentId !== commentId),
        );
        setCountReplies((prevCount) =>
          prevCount !== undefined ? prevCount - 1 : 0,
        );
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleUpdate = async (commentId: number, content: string) => {
    try {
      const response = await axiosInstance.put(`${route}/${commentId}/update`, {
        content,
      });
      if (response.status === 200) {
        setReplies((prevReplies) =>
          prevReplies.map((reply) =>
            reply.commentId === commentId ? { ...reply, content } : reply,
          ),
        );
        updateComment(commentId, content);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <CommentWrapper>
      <StyledCommentItem
        route={route}
        comment={comment}
        isReply={false}
        cntReplies={countReplies}
        clickReply={handleShowReply}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      {showReplies && (
        <ReplyWrapper>
          <CommentInputField
            route={route}
            postId={postId}
            idName={idName}
            commentId={comment.commentId}
            addComment={addedReplies}
          />
          {replies.map((eachReply) => (
            <StyledCommentItem
              key={eachReply.commentId}
              route={route}
              comment={eachReply}
              isReply={true}
              clickReply={handleShowReply}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </ReplyWrapper>
      )}
    </CommentWrapper>
  );
};

export default CommentListItem;
