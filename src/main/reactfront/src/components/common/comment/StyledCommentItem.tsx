import React, { useState } from 'react';

import { Comment } from '../../../types/MainDummyData';
import CommentItem from './StyledCommentItem.styles';

import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledCommentItem: React.FC<{
  comment: Comment;
  isReply: boolean;
  clickReply: (isShow: boolean) => void;
}> = ({ comment, isReply, clickReply }) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const handleClick = (): void => {
    clickReply(true);
    setIsExpand((prevState) => !prevState);
  };

  return (
    <CommentItem $isReply={isReply} $isExpand={isExpand}>
      <div className="commentInfo">
        <span>
          <PersonIcon />
        </span>
        <span>{comment.userId}</span>
        <span>{comment.createdDate}</span>
      </div>
      <p>{comment.content}</p>
      <div className="control">
        {!isReply && (
          <>
            <span onClick={handleClick}>
              <ExpandMoreIcon />
              답글&#40;{comment.replies.length}&#41;
            </span>
            <span>
              <ThumbUpIcon /> 좋아요&#40;{comment.likes}&#41;
            </span>
          </>
        )}
        <span>삭제</span>
      </div>
    </CommentItem>
  );
};

export default StyledCommentItem;
