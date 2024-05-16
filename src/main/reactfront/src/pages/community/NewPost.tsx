import React, { useState, FormEvent } from 'react';

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

const PostCategory = [
  { value: '운동완료', label: '운동완료' },
  { value: '식단', label: '식단' },
  { value: '보충제', label: '보충제' },
  { value: '재활운동', label: '재활운동' },
  { value: '상체운동', label: '상체운동' },
  { value: '하체운동', label: '하체운동' },
  { value: '전신운동', label: '전신운동' },
  { value: '맨몸운동', label: '맨몸운동' },
  { value: '유산소', label: '유산소' },
  { value: '스트레칭', label: '스트레칭' },
  { value: '건강', label: '건강' },
  { value: '이슈', label: '이슈' },
];

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = React.useState<string | null>('');
  const [editorContent, setEditorContent] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('제목:', title);
    console.log('카테고리:', category);
    console.log('내용:', editorContent);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <SelectBox
            label="카테고리"
            options={PostCategory}
            helperText=""
            onChange={setCategory}
            style={{ width: '100%' }}
          />
          <Box sx={{ mb: 2, minHeight: 500 }}>
            <Editor
              placeholder="글을 입력하세요."
              value={editorContent}
              onChange={setEditorContent}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              등록하기
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NewPost;
