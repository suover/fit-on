import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';
import AuthorInfo from '../common/authorInfo/AuthorInfo';

import ButtonLikePost from '../common/button/ButtonLikePost';
import ButtonShare from '../common/button/ButtonShare';
import CommentTemplate from '../common/comment/CommentsTemplate';
import { Comment, Routine } from '../../types/DummyData';

const ViewRoutine = () => {
  // useLocation 훅을 사용하여 navigate로 전달된 state에 접근
  const location = useLocation();
  const locationRoutine = location.state?.routine;
  const [routine, setRoutine] = useState(locationRoutine);

  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setisShared] = useState(false);

  const handleLikeClick = () => {
    if (routine) {
      setIsLiked(!isLiked);
      setRoutine({
        ...routine,
        like: isLiked ? routine.like - 1 : routine.like + 1,
      });
    }
  };

  const handleShareClick = () => {
    if (routine) {
      setisShared(!isShared);
    }
  };
  // location.state.routine 변경되었을 때 routine 상태를 업데이트
  useEffect(() => {
    setRoutine(locationRoutine);
  }, [locationRoutine]);

  // 댓글 추가 함수
  const handleCommentInsert = (newComment: Comment) => {
    const updatedComments = routine.comments
      ? [...routine.comments, newComment]
      : [newComment];
    setRoutine({ ...routine, comments: updatedComments });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ my: 4, p: 2 }}>
        <Box sx={{ p: 2, mb: 3, borderBottom: 1 }}>
          <Typography variant="h4">{routine.title || '제목 없음'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ ml: 2 }}>
            <AuthorInfo
              imageUrl=""
              userName={routine.userId}
              createTimeInfo={routine.writtenTime}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mx: 4 }}>
            {`Views: ${routine.view || 0}`}
          </Typography>
        </Box>
        <Box
          sx={{
            minHeight: '200px',
            height: 'auto',
            overflow: 'auto',
            my: 4,
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="body1">
            {routine.content || '내용 없음'}
          </Typography>
        </Box>

        {/* 좋아요, 북마크 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
            ml: 2,
            alignItems: 'center',
          }}
        >
          <Box sx={{ mr: 2 }}>
            <ButtonLikePost
              isLiked={isLiked}
              likeNum={routine.like}
              onClick={handleLikeClick}
            />
          </Box>

          <ButtonShare isShared={isShared} onClick={handleShareClick} />
        </Box>
      </Paper>

      <CommentTemplate
        comments={routine.comments}
        onInsert={handleCommentInsert}
      />
    </Container>
  );
};

export default ViewRoutine;
