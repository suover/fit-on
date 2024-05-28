import React, { useContext, useState } from 'react';
import axios from 'axios';

import AuthContext from '../../../context/AuthContext';
import InputField from './CommentInputField.styles';
import { Comment } from './CommentList';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const CommentInputField: React.FC<{
  route: string;
  postId: string;
  idName: string;
  commentId?: number;
  addComment: (comment: Comment) => void;
}> = ({ route, postId, idName, addComment, commentId }) => {
  const [content, setContent] = useState('');
  //const { nickname } = useContext(AuthContext);

  const handleCommentSubmit = async () => {
    if (content.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }

    const comment = {
      [idName]: postId,
      userId: 36,
      content: content,
      commentId: commentId ? commentId : null,
    };

    try {
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
      <button onClick={handleCommentSubmit}>등록</button>
    </InputField>
  );
};

export default CommentInputField;
