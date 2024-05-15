import CommentList from './CommentList';
import CommentLeave from './CommentLeave';
import { Box, Typography, Button } from '@mui/material';
import { Comment } from '../../../types/DummyData';

type CommentTemplateProps = {
  comments: Comment[];
  onInsert: (comment: Comment) => void;
};

const CommentTemplate = ({ comments, onInsert }: CommentTemplateProps) => {
  const scrollToCommentBox = () => {
    const commentBox = document.getElementById('comment');
    if (commentBox) {
      commentBox.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTotalCommentsCount = (comments: Comment[]) => {
    return comments.reduce((total, comment) => {
      console.log(
        `현재 댓글: ${comment.id}, 하위 댓글 수: ${comment.replies ? comment.replies.length : 0}`,
      );
      total += 1;
      if (comment.replies && comment.replies.length > 0) {
        const repliesCount = getTotalCommentsCount(comment.replies);
        console.log(`댓글 ${comment.id}의 총 답글 수: ${repliesCount}`);
        total += repliesCount;
      }
      return total;
    }, 0);
  };

  const totalComments = getTotalCommentsCount(comments);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ m: 2 }}>
          댓글 {totalComments}
        </Typography>
        <Button variant="outlined" onClick={scrollToCommentBox}>
          댓글 작성
        </Button>
      </Box>

      <CommentList comments={comments} />

      <div id="comment">
        <CommentLeave onInsert={onInsert} />
      </div>
    </Box>
  );
};

export default CommentTemplate;
