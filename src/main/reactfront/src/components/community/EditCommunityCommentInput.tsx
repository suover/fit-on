import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import InputField from '../common/comment/CommentInputField.styles';
import { Comment } from '../../types/CommentTypes';
import axiosInstance from '../../types/AxiosInstance';

const EditCommentInput: React.FC<{
  comment: Comment;
  route?: string;
  commentId?: number;
  existingContent?: string;
  handleUpdate: (commentId: number, content: string) => void;
}> = ({ comment, route, commentId, existingContent, handleUpdate }) => {
  const [content, setContent] = useState(existingContent || '');

  const handleCommentSubmit = async () => {
    if (content.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }

    const editComment = {
      ...comment,
      content: content,
    };

    try {
      if (commentId) {
        // Update comment
        const response = await axiosInstance.put(
          // `${route}/${commentId}/update`,
          // `${route}/comments/${commentId}`,
          `/api/community/comments/${commentId}`,
          editComment,
        );
        if (response.status === 200) {
          handleUpdate(commentId, content);
        }
      }
    } catch (error) {
      console.error('Error adding/updating comment:', error);
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

export default EditCommentInput;
