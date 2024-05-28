import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Paper,
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import SelectBox from '../../components/common/SelectBox';
import Editor from '../../components/common/Editor';

const Goal = [
  { value: '1', label: '근력 증가' },
  { value: '2', label: '다이어트' },
  { value: '3', label: '유연성 개선' },
  { value: '4', label: '체력 개선' },
];
const Level = [
  { value: '1', label: '상' },
  { value: '2', label: '중' },
  { value: '3', label: '하' },
];
const Part = [
  { value: '1', label: '전신' },
  { value: '2', label: '상체' },
  { value: '3', label: '하체' },
  { value: '4', label: 'None' },
];

const NewRoutine = () => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState<string | null>('');
  const [level, setLevel] = useState<string | null>('');
  const [target, setTarget] = useState<string | null>('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const [routineItem, setRoutineItem] = useState(''); // 루틴 목록 입력 상태
  const [lists, setLists] = useState<string[]>([]); // 루틴 리스트 상태

  // 게시글 공개/비공개 상태를 관리하는 상태 변수
  const [isPublic, setIsPublic] = useState(true);

  // 스위치 토글 이벤트 핸들러
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  // 루틴 목록을 추가하는 함수
  const handleAddRoutineItem = () => {
    if (routineItem.trim()) {
      setLists([...lists, routineItem.trim()]);
      setRoutineItem('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const routineData = {
      userId: 30, // 로그인된 사용자 ID로 교체 필요
      title,
      content,
      goalId: parseInt(purpose || '0', 10), // 선택된 목적 값 설정
      levelId: parseInt(level || '0', 10), // 선택된 난이도 값 설정
      partId: parseInt(target || '0', 10), // 선택된 부위 값 설정
      isPublic,
      routineItems: lists,
    };

    console.log('Submitting routine data:', routineData);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/routine/new-routine',
        routineData,
      );
      console.log('Routine created:', response.data);
      navigate('/routine'); // 페이지 이동
    } catch (error) {
      console.error('There was an error creating the routine!', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, margin: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              새 루틴 작성
            </Typography>
            <FormControlLabel
              control={<Switch checked={isPublic} onChange={handleToggle} />}
              label={isPublic ? 'Public' : 'Private'}
            />
          </Box>
          <TextField
            label="제목"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box sx={{ display: 'flex' }}>
            <SelectBox
              label="운동 목적"
              options={Goal}
              helperText="원하는 운동 목적을 선택하세요."
              onChange={setPurpose}
            />
            <SelectBox
              label="난이도"
              options={Level}
              helperText="난이도를 선택하세요."
              onChange={setLevel}
            />
            <SelectBox
              label="운동 부위"
              options={Part}
              helperText="타겟 부위를 선택하세요."
              onChange={setTarget}
            />
          </Box>

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={11}>
              <TextField
                label="루틴 목록 추가"
                fullWidth
                variant="outlined"
                value={routineItem}
                onChange={(e) => setRoutineItem(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleAddRoutineItem();
                  }
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={handleAddRoutineItem}
                variant="contained"
                color="primary"
                sx={{ height: '54px' }}
              >
                <PlaylistAddIcon />
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              gap: 1,
              mt: 0,
              mb: 1,
              minHeight: '50px',
              alignItems: 'flex-start',
              padding: '8px',
            }}
          >
            {lists.map((item, index) => (
              <Chip
                color="primary"
                variant="outlined"
                label={item}
                key={index}
                onDelete={() => {
                  setLists(lists.filter((_, idx) => idx !== index));
                }}
              />
            ))}
          </Box>

          <Box sx={{ mb: 2, minHeight: 500 }}>
            <Editor
              placeholder="루틴 내용을 입력하세요."
              value={content}
              onChange={setContent}
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
              onClick={() => navigate('/routine')}
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

export default NewRoutine;
