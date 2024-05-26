import React, { useState, ChangeEvent } from 'react';
import { Box, Container, MenuItem, TextField, Typography } from '@mui/material';
import GenericButton from '../../components/common/genericButton/GenericButton';
import Editor from '../../components/common/Editor';
import noImage from '../../assets/itemRegister/noImage.jpeg';
import { Link } from 'react-router-dom';

const PostRegisterPage: React.FC = () => {
  interface FormValues {
    postName: string;
    postCategory: string;
    description: string;
  }

  const [formValues, setFormValues] = useState<FormValues>({
    postName: '',
    postCategory: '',
    description: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDescriptionChange = (value: string) => {
    setFormValues({ ...formValues, description: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, postCategory: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Values:', formValues);
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
              name="postName"
              placeholder="제목을 지어주세요"
              label="제목"
              value={formValues.postName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              select
              name="postCategory"
              label="카테고리"
              value={formValues.postCategory}
              onChange={handleSelectChange}
              fullWidth
            >
              <MenuItem value="헬스">헬스</MenuItem>
              <MenuItem value="요가/필라테스">요가/필라테스</MenuItem>
              <MenuItem value="스트레칭/홈트">스트레칭/홈트</MenuItem>
              <MenuItem value="재활/체형교정">재활/체형교정</MenuItem>
              <MenuItem value="스포츠 훈련">스포츠 훈련</MenuItem>
              <MenuItem value="스포츠 테이핑">스포츠 테이핑</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          {/* <Editor
            value={formValues.description}
            onChange={handleDescriptionChange}
            placeholder="게시글 내용을 작성하세요"
          /> */}
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
