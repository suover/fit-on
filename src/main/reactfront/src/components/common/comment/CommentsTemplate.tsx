import CommentList from './CommentList';
import CommentLeave from './CommentLeave';
import { Box, Typography, Button } from '@mui/material';

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
      console.log(`현재 댓글: ${comment.id}, 하위 댓글 수: ${comment.replies ? comment.replies.length : 0}`);
      total += 1; // 현재 댓글
      if (comment.replies && comment.replies.length > 0) {
        const repliesCount = getTotalCommentsCount(comment.replies); // 하위 답글 재귀적 계산
        console.log(`댓글 ${comment.id}의 총 답글 수: ${repliesCount}`);
        total += repliesCount;
      }
      return total;
    }, 0);
  };

  const totalComments = getTotalCommentsCount(comments); // 전체 댓글 및 답글 수 계산

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 2 }}>
        <Typography variant="h5" component="h2" sx={{ m: 2 }}>
          댓글 {totalComments}
          {/* 댓글 {comments.length} */}
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
