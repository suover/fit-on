import React, { useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import AuthorInfo from '../authorinfo/AuthorInfo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentLeave from './CommentLeave';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

type Comment = {
  no: number;
  id: string;
  content: string;
  writtenTime: string;
  like: number;
  created_at: Date;
  updated_at: Date;
  replies: Comment[];
};
type CommentProps = {
  comment: Comment;
  isReply?: boolean;
};

const CommentComponent: React.FC<CommentProps> = ({ comment, isReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replies, setReplies] = useState<Comment[]>(comment.replies || []);

  const handleReplySubmit = (newReply: Comment) => {
    setReplies([...replies, newReply]);
    setShowReplyBox(false);
  };

  const colors = [
    '#e0d8cf',
    '#f4f6f8',
    '#e9f1f8',
    '#dce4ef',
    '#f2f7f5',
    '#e6f2ee',
    '#cfe9e3',
    '#f2f2f2',
    '#e6e6e6',
    '#cccccc',
    '#fafafa',
    '#f0eae0',
  ];

  return (
    <Box
      sx={{
        mb: 1,
        border: '1px',
        borderRadius: '4px',
      }}
    >
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
        {isReply && <SubdirectoryArrowRightIcon sx={{ mr: 2, color: 'gray' }} />}
        <AuthorInfo imageUrl="" userName={comment.id} createTimeInfo={comment.writtenTime} />
      </Box>
      
      <Typography variant="body1" sx={{ flexGrow: 1, mx: 2, mt: 2, mb: 2, wordBreak: 'break-word' }}>
        {comment.content}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Button size="small" onClick={() => setShowReplyBox(!showReplyBox)}>
          답글
        </Button>
        <IconButton aria-label="like" size="small">
          <ThumbUpAltIcon fontSize="inherit" />
          {comment.like}
        </IconButton>
      </Box>

      <Box>{showReplyBox && <CommentLeave onInsert={handleReplySubmit} prePopulatedText={`@${comment.id} `} />}</Box>

      {replies.map((reply, index) => (
        <Box key={reply.no} sx={{ bgcolor: colors[index % colors.length] }}>
          <CommentComponent comment={reply} isReply={true} />
        </Box>
      ))}
    </Box>
  );
};

export default CommentComponent;

