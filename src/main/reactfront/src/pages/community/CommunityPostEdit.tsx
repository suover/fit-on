import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, TextField, Typography } from '@mui/material';
import { BackBtn } from '../../components/postDetail/PostDetail.styles';
import Editor from '../../components/common/Editor';
import UseAuth from '../../context/UseAuth';

const CommunityPostEdit = () => {
  const { postId } = useParams<{ postId: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();
  const { isAuthenticated } = UseAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/community/posts/${postId}`,
        );
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setUserId(post.userId);
        setCategoryId(post.categoryId);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/community/posts/${postId}`, {
        title,
        content,
        userId,
        categoryId,
      });
      navigate(`/community/${postId}`);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container
        maxWidth="lg"
        sx={{ minHeight: '700px', padding: '50px 0 100px' }}
      >
        <Typography variant="h6">로그인이 필요합니다.</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ minHeight: '700px', padding: '50px 0 100px' }}
      >
        <Typography variant="h6">로딩 중...</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: '700px', padding: '50px 0 100px' }}
    >
      <Box mb={2}>
        <TextField
          label="제목"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <Editor
          placeholder="글을 입력하세요."
          value={content}
          onChange={handleContentChange}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <BackBtn onClick={handleSave} style={{ marginRight: '10px' }}>
          저장
        </BackBtn>
        <BackBtn
          onClick={() => navigate(`/community/${postId}`)}
          style={{ marginRight: '10px' }}
        >
          취소
        </BackBtn>
      </Box>
    </Container>
  );
};

export default CommunityPostEdit;
