import React, { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import {
  Paper,
  Container,
  TextField,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Editor from '../../components/common/Editor';
import SelectBox from '../../components/common/SelectBox';
import AuthContext from '../../context/AuthContext';

const PostCategory = [
  { value: '1', label: '식단' },
  { value: '2', label: '보충제' },
  { value: '3', label: '닭가슴살' },
  { value: '4', label: '상체운동' },
  { value: '5', label: '하체운동' },
  { value: '6', label: '전신운동' },
  { value: '7', label: '맨몸운동' },
  { value: '8', label: '유산소' },
  { value: '9', label: '재활운동' },
  { value: '10', label: '스트레칭' },
  { value: '11', label: '건강' },
  { value: '12', label: '이슈' },
  { value: '13', label: '운동완료' },
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

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState<CommunityDTO>({
    categoryId: 1,
    title: '',
    content: '',
    isDeleted: false,
    viewCount: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleCategoryChange = (value: string | null) => {
    if (value !== null) {
      const categoryId = parseInt(value, 10);
      setFormData({ ...formData, categoryId });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!isAuthenticated || !token) {
      console.error('로그인 필요');
      return;
    }

    try {
      const response = await axios.post('/api/community/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Post created successfully: ', response.data); //로그
      navigate('/community');
    } catch (error) {
      console.error('There was an error creating the post!', error); //로그
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, margin: 'auto' }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          새 글 쓰기
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="제목"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <SelectBox
            label="카테고리"
            options={PostCategory}
            helperText=""
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
          />
          <Box sx={{ mb: 2, minHeight: 500 }}>
            <Editor
              placeholder="글을 입력하세요."
              value={formData.content}
              onChange={handleEditorChange}
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
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => navigate('/community')}
            >
              취소
            </Button>
            <Button type="submit" variant="contained" color="primary">
              등록
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NewPost;
