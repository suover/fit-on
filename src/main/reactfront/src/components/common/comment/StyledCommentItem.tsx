import React, { useState } from 'react';
import axios from 'axios';

import { Comment } from './CommentList';
import CommentItem from './StyledCommentItem.styles';

import PersonIcon from '@mui/icons-material/Person';
//import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const StyledCommentItem: React.FC<{
  comment: Comment;
  isReply: boolean;
  cntReplies?: number;
  clickReply: (isShow: boolean) => void;
}> = ({ comment, isReply, cntReplies, clickReply }) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const handleClick = (): void => {
    clickReply(true);
    setIsExpand((prevState) => !prevState);
  };
  const createdDate = comment.createdAt.split('T')[0];

  return (
    <CommentItem $isReply={isReply} $isExpand={isExpand}>
      <div className="commentInfo">
        <span>
          <PersonIcon />
        </span>
        <span>{comment.nickname}</span>
        <span>{createdDate}</span>
      </div>
      <p>{comment.content}</p>
      <div className="control">
        {!isReply && (
          <>
            <span onClick={handleClick}>
              <ExpandMoreIcon />
              답글&#40;{cntReplies}&#41;
            </span>
            {/* <span>
              <ThumbUpIcon /> 좋아요&#40;{comment.}&#41;
            </span> */}
          </>
        )}
        <span>수정</span>
        <span>삭제</span>
      </div>
    </CommentItem>
  );
};

export default StyledCommentItem;
