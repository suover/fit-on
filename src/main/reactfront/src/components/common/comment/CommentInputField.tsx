import React, { useContext, useState } from 'react';
import axios from '../../../api/axiosConfig';

import AuthContext from '../../../context/AuthContext';
import InputField from './CommentInputField.styles';
import { Comment } from './CommentList';
import { useNavigate } from 'react-router-dom';

const CommentInputField: React.FC<{
  route: string;
  postId: string;
  idName: string;
  commentId?: number;
  addComment: (comment: Comment) => void;
}> = ({ route, postId, idName, addComment, commentId }) => {
  const [content, setContent] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCommentSubmit = async () => {
    setIsDisable(true);
    if (userId === null || userId === undefined) {
      alert('로그인 후 이용해주세요!');
      navigate('/sign-in');
      setIsDisable(false);
      return;
    }

    if (content.trim().length === 0) {
      alert('내용을 입력해주세요.');
      setIsDisable(false);
      return;
    }

    const comment = {
      [idName]: postId,
      userId: userId,
      content: content,
      commentId: commentId ? commentId : null,
    };

    try {
      const response = await axios.post(
        `${route}/newComments`,
        comment,
      );
      if (response.status === 200) {
        setContent('');
        const savedComment = response.data;
        addComment(savedComment);
        setIsDisable(false);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
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
      <button onClick={handleCommentSubmit} disabled={isDisable ? true : false}>
        등록
      </button>
    </InputField>
  );
};

export default CommentInputField;
