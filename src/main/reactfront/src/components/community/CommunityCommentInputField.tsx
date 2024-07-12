import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import InputField from '../../components/common/comment/CommentInputField.styles';
import { Comment } from '../../types/CommentTypes';
import axiosInstance from '../../types/AxiosInstance';

const CommunityCommentInputField: React.FC<{
  route: string;
  postId: string;
  idName: string;
  commentId?: number;
  addComment: (comment: Comment) => void;
}> = ({ route, postId, idName, addComment, commentId }) => {
  const [content, setContent] = useState('');
  const { userId, nickname, isAuthenticated } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async () => {
    if (!isAuthenticated) {
      // 로그인 상태 확인
      alert('로그인을 해주세요.');
      return;
    }

    if (isSubmitting) return; // 중복 요청 방지
    setIsSubmitting(true); // 제출 상태로 변경

    if (content.trim().length === 0) {
      alert('내용을 입력해주세요.');
      setIsSubmitting(false); // 제출 상태 해제
      return;
    }

    const comment = {
      [idName]: postId,
      userId: userId,
      content: content,
      parentCommentId: commentId || null,
      commentId: commentId || null,
      nickname: nickname,
      createdAt: new Date().toISOString(),
    };

    try {
      console.log('****** Submitting comment...'); // 콘솔 로그 추가
      const response = await axiosInstance.post(
        `${route}/newComments`,
        comment,
      );
      if (response.status === 200) {
        setContent('');
        const savedComment = response.data;
        addComment(savedComment);
      }
    } catch (error) {
      console.error('댓글 추가 에러:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InputField>
      <textarea
        name="comment"
        id="comment"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      {/* <button onClick={handleCommentSubmit} >등록</button> */}
      <button onClick={handleCommentSubmit} disabled={isSubmitting}>
        등록
      </button>{' '}
      {/* 버튼 비활성화 추가 */}
    </InputField>
  );
};

export default CommunityCommentInputField;
