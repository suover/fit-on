import React, { useContext, useEffect, useState } from 'react';
import axios from '../../../api/axiosConfig';

import InputField from './CommentInputField.styles';
import { Comment } from './CommentList';
import styled from 'styled-components';

const EditInputWrapper = styled.div`
  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;
`;

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
        const response = await axios.put(
          `${route}/${commentId}/update`,
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
    <EditInputWrapper>
      <InputField>
        <textarea
          name="comment"
          id="comment"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button onClick={handleCommentSubmit}>등록</button>
      </InputField>
    </EditInputWrapper>
  );
};

export default EditCommentInput;
