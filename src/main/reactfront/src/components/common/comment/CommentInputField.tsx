import React from 'react';

import InputField from './CommentInputField.styles';
// 등록 버튼을 누르면 axios 로 데이터 전달할 수 있도록 click event 만들어 주고, props 로 경로 받아서 전달할 수 있도록 해야함!
const CommentInputField = () => {
  return (
    <InputField>
      <textarea name="comment" id="comment" />
      <button>등록</button>
    </InputField>
  );
};

export default CommentInputField;
