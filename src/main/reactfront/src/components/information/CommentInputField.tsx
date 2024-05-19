import React from 'react';

import InputField from './CommentInputField.styles';

const CommentInputField = () => {
  return (
    <InputField>
      <textarea name="comment" id="comment" />
      <button>등록</button>
    </InputField>
  );
};

export default CommentInputField;
