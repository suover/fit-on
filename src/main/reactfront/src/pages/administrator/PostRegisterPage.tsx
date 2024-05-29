import React, { useState, ChangeEvent, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import AuthContext from '../../context/AuthContext';
import GenericButton from '../../components/common/genericButton/GenericButton';
import Editor from '../../components/common/Editor';
import noImage from '../../assets/itemRegister/noImage.jpeg';

import { Box, Container, MenuItem, TextField, Typography } from '@mui/material';

interface InfoValues {
  title: string;
  categoryId: string;
  content: string;
}

const PostRegisterPage: React.FC = () => {
  const { nickname } = useContext(AuthContext);
  const navigate = useNavigate();
  const [infoValues, setInfoValues] = useState<InfoValues>({
    title: '',
    categoryId: '',
    content: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 제목
    const { name, value } = e.target;
    setInfoValues({ ...infoValues, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 카테고리
    setInfoValues({ ...infoValues, categoryId: e.target.value });
  };

  const handleDescriptionChange = (value: string) => {
    // 이미지
    setInfoValues({ ...infoValues, content: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 이미지 미리보기, 서버로 전송될 이미지 담기
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setImageFile(file);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 입력값 유효성 검증
  const dataValidation = (): boolean => {
    if (infoValues.title.trim().length === 0) {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (infoValues.categoryId.trim().length === 0) {
      alert('카테고리를 선택해주세요.');
      return false;
    }

    if (!imageFile) {
      alert('이미지를 등록해주세요.');
      return false;
    }

    if (infoValues.content.trim().length === 0) {
      alert('내용을 입력해주세요');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dataValidation()) return;

    const infoData: InfoValues = {
      title: infoValues.title,
      categoryId: infoValues.categoryId,
      content: infoValues.content,
    };

    const formData = new FormData();
    formData.append('information', JSON.stringify(infoData));
    if (imageFile) {
      formData.append('file', imageFile);
    }

    try {
      const res = await axios.post(
        'http://localhost:8080/api/newInfo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Response:', res.data);
      navigate('/info');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container sx={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <Typography
        sx={{ fontWeight: 'bold', fontSize: '1.875rem' }}
        variant="h3"
        gutterBottom
      >
        정보 게시글 작성
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box
            sx={{
              flex: 1,
              maxWidth: '400px',
            }}
          >
            <img
              src={imagePreview || noImage}
              alt="Preview"
              style={{
                width: '100%',
                height: '300px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                marginBottom: '15px',
              }}
              onClick={() => document.getElementById('image-input')?.click()}
            />
            <input
              type="file"
              accept="image/*"
              id="image-input"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </Box>
          <Box
            sx={{
              flex: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginLeft: '20px',
            }}
          >
            <TextField
              name="title"
              placeholder="제목을 지어주세요"
              label="제목"
              value={infoValues.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              select
              name="category"
              label="카테고리"
              value={infoValues.categoryId}
              onChange={handleSelectChange}
              fullWidth
            >
              <MenuItem value="1">헬스</MenuItem>
              <MenuItem value="2">요가/필라테스</MenuItem>
              <MenuItem value="3">스트레칭/홈트</MenuItem>
              <MenuItem value="4">재활/체형교정</MenuItem>
              <MenuItem value="5">스포츠 훈련</MenuItem>
              <MenuItem value="6">스포츠 테이핑</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <Editor
            value={infoValues.content}
            onChange={handleDescriptionChange}
            placeholder="게시글 내용을 작성하세요"
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link to="/administrator/post-list">
            <GenericButton
              style={{
                width: '120px',
                height: '50px',
                fontSize: '1rem',
                marginRight: '10px',
              }}
            >
              뒤로가기
            </GenericButton>
          </Link>
          <GenericButton
            style={{
              width: '120px',
              height: '50px',
              fontSize: '1rem',
            }}
            type="submit"
          >
            등록하기
          </GenericButton>
        </Box>
      </Box>
    </Container>
  );
};

export default PostRegisterPage;
