import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../types/AxiosInstance';
import { Comment } from '../../types/CommentTypes';
import StyledCommunityCommentItem from './StyledCommunityCommentItem';
import CommunityCommentInputField from './CommunityCommentInputField';

const CommentWrapper = styled.div`
  width: 100%;
`;

const ReplyWrapper = styled.div`
  padding-left: 60px;
`;

const CommunityCommentListItem: React.FC<{
  comment: Comment;
  route: string;
  postId: string;
  idName: string;
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, content: string) => void;
}> = ({ comment, route, postId, idName, deleteComment, updateComment }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [countReplies, setCountReplies] = useState<number>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 중복 요청 방지를 위한 상태 추가

  useEffect(() => {
    if (comment.commentId !== null) {
      // 대댓글 불러오기
      const fetchComment = async () => {
        try {
          const res = await axiosInstance.get<Comment[]>(
            // `${route}/comments/${comment.commentId}/replies`,
            `${route}/posts/${postId}/comments/${comment.commentId}/replies`,
          );
          setReplies(res.data);
          setCountReplies(res.data.length);
        } catch (error) {
          console.error('Error fetching replies:', error);
        }
      };

      fetchComment();
    }
    // }, [comment.commentId, route]);
  }, [comment.commentId, route, postId]);

  useEffect(() => {
    setCountReplies(replies.length);
  }, [replies]);

  const addedReplies = (comment: Comment) => {
    setReplies([...replies, comment]);
    setCountReplies((prevCount) => (prevCount || 0) + 1);
  };

  const handleShowReply = (): void => {
    setShowReplies((prevState) => !prevState);
  };

  //대댓글 삭제
  const handleDelete = async (commentId: number) => {
    try {
      const response = await axiosInstance.delete(
        // `/api/community/comments/${commentId}`,
        // `${route}/comments/${commentId}`,
        `/api/community/comments/${commentId}`,
      );
      if (response.status === 200) {
        deleteComment(commentId);
        setReplies((prevReplies) =>
          // prevReplies.filter((reply) => reply.commentId !== commentId),
          Array.isArray(prevReplies)
            ? prevReplies.filter((reply) => reply.commentId !== commentId)
            : [],
        );
        setCountReplies((prevCount) =>
          prevCount !== undefined ? prevCount - 1 : 0,
        );
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  //대댓글 업데이트
  const handleUpdate = async (commentId: number, content: string) => {
    try {
      const response = await axiosInstance.put(
        `/api/community/comments/${commentId}`,
        // `${route}/comments/${commentId}`,
        // `${route}/posts/${postId}/comments/${commentId}/update`,
        { content },
      );
      if (response.status === 200) {
        updateComment(commentId, content);
        // updateComment(commentId, response.data.content); // 반환된 데이터를 사용
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  //대댓글 추가
  const handleAddComment = async (comment: Comment) => {
    if (isSubmitting) return; // 중복 요청 방지
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        // `${route}/comments`, comment
        // `${route}/newComments`,
        `${route}/posts/${postId}/newComments`,
        comment,
      );
      if (response.status === 200) {
        const newComment = response.data;
        console.log('New Comment:', newComment); // 댓글 생성 후 반환된 데이터 로그
        addedReplies(response.data);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommentWrapper>
      <StyledCommunityCommentItem
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
          <CommunityCommentInputField
            route={route}
            postId={postId}
            idName={idName}
            commentId={comment.commentId}
            addComment={handleAddComment}
          />
          {replies.map((eachReply) => (
            <StyledCommunityCommentItem
              route={route}
              key={eachReply.commentId}
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

export default CommunityCommentListItem;
