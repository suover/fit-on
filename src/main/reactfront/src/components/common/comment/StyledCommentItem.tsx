import React, { useContext, useState } from 'react';

import { Comment } from './CommentList';
import AuthContext from '../../../context/AuthContext';
import CommentItem from './StyledCommentItem.styles';
import EditCommentInput from './EditCommentInput';

import PersonIcon from '@mui/icons-material/Person';
//import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledCommentItem: React.FC<{
  comment: Comment;
  route: string;
  isReply: boolean;
  cntReplies?: number;
  clickReply: (isShow: boolean) => void;
  handleDelete: (commentId: number) => void;
  handleUpdate: (commentId: number, content: string, isReply?: boolean) => void;
}> = ({
  comment,
  route,
  isReply,
  cntReplies,
  clickReply,
  handleDelete,
  handleUpdate,
}) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { nickname } = useContext(AuthContext);
  const createdDate = comment.createdAt.split('T')[0];

  const handleClick = (): void => {
    clickReply(true);
    setIsExpand((prevState) => !prevState);
  };

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleUpdateComment = (commentId: number, content: string) => {
    if (comment.parentCommentId !== null) {
      handleUpdate(commentId, content, true);
      setIsEditing(false);
      return;
    }
    handleUpdate(commentId, content);
    setIsEditing(false);
  };

  return (
    <CommentItem $isReply={isReply} $isExpand={isExpand}>
      <div className="commentInfo">
        <span>
          <PersonIcon />
        </span>
        <span>{comment.nickname}</span>
        <span>{createdDate}</span>
      </div>
      {isEditing ? (
        <EditCommentInput
          comment={comment}
          route={route}
          commentId={comment.commentId}
          existingContent={comment.content}
          handleUpdate={handleUpdateComment}
        />
      ) : (
        <p>{comment.content}</p>
      )}
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
        {comment.nickname === nickname ? (
          <>
            <span onClick={handleEdit}>{isEditing ? '취소' : '수정'}</span>
            <span onClick={() => handleDelete(comment.commentId)}>삭제</span>
          </>
        ) : (
          ''
        )}
      </div>
    </CommentItem>
  );
};

export default StyledCommentItem;
