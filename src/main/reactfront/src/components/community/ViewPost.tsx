import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';
import AuthorInfo from '../common/authorInfo/AuthorInfo';

import CommentTemplate from '../common/comment/CommentsTemplate';

import ButtonLikePost from '../common/button/ButtonLikePost';
import ButtonShare from '../common/button/ButtonShare';

type Comment = {
  id: number;
  userId: string;
  content: string;
  writtenTime: string;
  like: number;
  created_at: Date;
  updated_at: Date;
  replies: Comment[];
};

const ViewPost = () => {
  // useLocation 훅을 사용하여 navigate로 전달된 state에 접근
  const location = useLocation();
  const locationPost = location.state?.post;
  const [post, setPost] = useState(locationPost);

  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setisShared] = useState(false);

  const handleLikeClick = () => {
    if (post) {
      setIsLiked(!isLiked);
      setPost({
        ...post,
        like: isLiked ? post.like - 1 : post.like + 1,
      });
    }
  };
  const handleShareClick = () => {
    if (post) {
      setisShared(!isShared);
    }
  };

  useEffect(() => {
    setPost(locationPost);
  }, [locationPost]);

  const handleCommentInsert = (newComment: Comment) => {
    const updatedComments = post.comments
      ? [...post.comments, newComment]
      : [newComment];
    setPost({ ...post, comments: updatedComments });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ my: 4, p: 2 }}>
        <Box sx={{ p: 2, mb: 3, borderBottom: 1 }}>
          <Typography variant="h4">{post.title || '제목 없음'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ ml: 2 }}>
            <AuthorInfo
              imageUrl=""
              userName={post.id}
              createTimeInfo={post.writtenTime}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mx: 4 }}>
            {`Views: ${post.view || 0}`}
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
          <Typography variant="body1">{post.content || '내용 없음'}</Typography>
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
              likeNum={post.like}
              onClick={handleLikeClick}
            />
          </Box>
          <Box sx={{ mr: 2 }}>
            <ButtonShare isShared={isShared} onClick={handleShareClick} />
          </Box>
        </Box>
      </Paper>

      <CommentTemplate
        comments={post.comments}
        onInsert={handleCommentInsert}
      />
    </Container>
  );
};

export default ViewPost;
