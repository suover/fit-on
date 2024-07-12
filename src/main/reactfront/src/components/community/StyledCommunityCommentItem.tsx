import React, { useContext, useState } from 'react';
import { Comment } from '../../types/CommentTypes';
import AuthContext from '../../context/AuthContext';
import CommentItem from '../common/comment/StyledCommentItem.styles';
import EditCommentInput from './EditCommunityCommentInput';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledCommunityCommentItem: React.FC<{
  comment: Comment;
  route: string;
  isReply: boolean;
  cntReplies?: number;
  clickReply: (isShow: boolean) => void;
  handleDelete: (commentId: number) => void;
  handleUpdate: (commentId: number, content: string) => void;
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
  // const createdDate = comment.createdAt.split('T')[0];
  const createdDate = comment.updatedAt
    ? comment.updatedAt.split('T')[0]
    : comment.createdAt
      ? comment.createdAt.split('T')[0]
      : 'Unknown Date';

  const handleClick = (): void => {
    clickReply(true);
    setIsExpand((prevState) => !prevState);
  };

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleUpdateComment = (commentId: number, content: string) => {
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
          </>
        )}
        {comment.nickname === nickname ? (
          <>
            <span onClick={handleEdit}>수정</span>
            <span onClick={() => handleDelete(comment.commentId)}>삭제</span>
          </>
        ) : (
          ''
        )}
      </div>
    </CommentItem>
  );
};

export default StyledCommunityCommentItem;
