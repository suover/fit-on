import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { Box, Container, TextField, Typography } from '@mui/material';
import { BackBtn } from '../../components/postDetail/PostDetail.styles';
import Editor from '../../components/common/Editor';
import UseAuth from '../../context/UseAuth';
import SelectBox from '../../components/common/SelectBox';

const PostCategory = [
  { value: '2', label: '식단' },
  { value: '3', label: '보충제' },
  { value: '4', label: '닭가슴살' },
  { value: '5', label: '재활운동' },
  { value: '6', label: '상체운동' },
  { value: '7', label: '하체운동' },
  { value: '8', label: '전신운동' },
  { value: '9', label: '맨몸운동' },
  { value: '10', label: '유산소' },
  { value: '11', label: '스트레칭' },
  { value: '12', label: '건강' },
  { value: '13', label: '이슈' },
  { value: '14', label: '운동완료' },
];

export interface CommunityDTO {
  communityId?: number;
  userId?: number;
  categoryId: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  viewCount: number;
}

const CommunityPostEdit = () => {
  const { postId } = useParams<{ postId: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();
  const { isAuthenticated } = UseAuth();
  const [formData, setFormData] = useState<CommunityDTO>({
    categoryId: 1,
    title: '',
    content: '',
    isDeleted: false,
    viewCount: 0,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/community/posts/${postId}`);
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setUserId(post.userId);
        setCategoryId(post.categoryId);
        setFormData({ ...formData, categoryId: post.categoryId }); // formData에도 categoryId 반영
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

  //제목 수정
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //카테고리 수정
  const handleCategoryChange = (value: string | null) => {
    if (value !== null) {
      const categoryId = parseInt(value, 10);
      setCategoryId(categoryId); // categoryId 상태 업데이트
      setFormData({ ...formData, categoryId });
    }
  };

  //내용 수정
  const handleContentChange = (value: string) => {
    setContent(value);
  };

  //글 저장
  const handleSave = async () => {
    try {
      await axios.put(`/api/community/posts/${postId}`, {
        title,
        content,
        userId,
        categoryId: formData.categoryId,
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
      <SelectBox
        label="카테고리"
        options={PostCategory}
        helperText=""
        value={categoryId ? categoryId.toString() : ''}
        onChange={handleCategoryChange}
        style={{ width: '100%' }}
      />
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
