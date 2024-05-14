import React from 'react';
import { Box } from '@mui/material';
import Commentitem from './CommentComponent';
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

type CommentListProps = {
  comments: Comment[];
};
const colors = ['#f0f0f0', '#f7f7f7'];

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <Box>
      {comments.map((comment, index) => (
        <Box key={comment.no} sx={{ bgcolor: colors[index % colors.length], margin: '8px 0', padding: '8px' }}>
          <Commentitem comment={comment} isReply={false} />
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
