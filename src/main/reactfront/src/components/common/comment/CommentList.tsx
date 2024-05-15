import React from 'react';
import { Box } from '@mui/material';
import Commentitem from './CommentComponent';
import { Comment } from '../../../types/DummyData';

type CommentListProps = {
  comments: Comment[];
};
const colors = ['#f0f0f0', '#f7f7f7'];

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <Box>
      {comments.map((comment, index) => (
        <Box
          key={comment.id}
          sx={{
            bgcolor: colors[index % colors.length],
            margin: '8px 0',
            padding: '8px',
          }}
        >
          <Commentitem comment={comment} isReply={false} />
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
