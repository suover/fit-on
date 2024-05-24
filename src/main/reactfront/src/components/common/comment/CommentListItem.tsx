import React, { useState } from 'react';
import styled from 'styled-components';

import { Comment } from '../../../types/MainDummyData';
import StyledCommentItem from './StyledCommentItem';
import CommentInputField from './CommentInputField';

const CommentWrapper = styled.div`
  width: 100%;
`;

const ReplyWrapper = styled.div`
  padding-left: 60px;
`;

const CommentListItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const replies: Comment[] = comment.replies;

  const handleShowReply = (isShow: boolean): void => {
    setShowReplies((prevState) => !prevState);
  };

  return (
    <CommentWrapper>
      <StyledCommentItem
        comment={comment}
        isReply={false}
        clickReply={handleShowReply}
      />
      {showReplies && (
        <ReplyWrapper>
          <CommentInputField />
          {replies
            ? replies.map((reply) => (
                <StyledCommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  clickReply={handleShowReply}
                />
              ))
            : ''}
        </ReplyWrapper>
      )}
    </CommentWrapper>
  );
};

export default CommentListItem;
