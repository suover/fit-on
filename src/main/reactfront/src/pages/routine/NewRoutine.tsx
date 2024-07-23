import React, { useState, useEffect, FormEvent, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axiosConfig';
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
import noImage from '../../assets/itemRegister/noImage.jpeg';
import AuthContext from '../../context/AuthContext';

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

interface ImageUploadProps {
  onImageChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreview(reader.result as string);
          onImageChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid black',
        width: '100%',
        height: 400,
        mb: 2,
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        id="fileInput"
        onChange={handleImageChange}
      />
      <Box
        component="img"
        src={preview || noImage}
        alt="thumbnail"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

const NewRoutine = () => {
  const { userId, nickname } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState<string | null>('');
  const [level, setLevel] = useState<string | null>('');
  const [target, setTarget] = useState<string | null>('');
  const [content, setContent] = useState('');
  const [routineId, setRoutineId] = useState<number | null>(null);

  const [routineItem, setRoutineItem] = useState('');
  const [lists, setLists] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  // 게시글 공개/비공개 상태를 관리하는 상태 변수
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    if (!userId) {
      alert('로그인 후 게시글 작성이 가능합니다.');
      navigate('/sign-in');
      return;
    }

    if (location.state && location.state.routine) {
      const {
        title,
        content,
        goalId,
        levelId,
        partId,
        routineId,
        routineItems,
        isPublic,
      } = location.state.routine;
      setTitle(title);
      setContent(content);
      setPurpose(String(goalId));
      setLevel(String(levelId));
      setTarget(String(partId));
      setRoutineId(routineId);
      setLists(routineItems || []);
      setIsPublic(isPublic);
    }
  }, [location.state]);

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

    if (!image) {
      alert('이미지를 업로드해주세요.');
      return;
    } else if (!title) {
      alert('제목을 입력해주세요.');
      return;
    } else if (!purpose) {
      alert('운동 목적을 체크해주세요.');
      return;
    } else if (!level) {
      alert('난이도를 체크해주세요.');
      return;
    } else if (!target) {
      alert('운동 부위를 체크해주세요.');
      return;
    } else if (!content) {
      alert('루틴 내용을 작성해주세요');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('goalId', purpose!.toString());
      formData.append('levelId', level!.toString());
      formData.append('partId', target!.toString());
      formData.append('isPublic', isPublic.toString());
      formData.append('userId', userId!.toString());
      formData.append('nickname', nickname!);

      if (routineId) {
        // 기존 게시글 수정
        const response = await axios.put(
          `/api/routine/${routineId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Routine updated:', response.data);
      } else {
        // 새 게시글 생성
        const response = await axios.post(
          '/api/routine/new-routine',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Routine created:', response.data);
      }
      navigate('/routine'); // 페이지 이동
    } catch (error) {
      console.error(
        'There was an error uploading the image or creating/updating the routine!',
        error,
      );
    }
  };

  const handleCancel = () => {
    if (
      location.state &&
      location.state.from === '/mypage/my-routine/my-routines'
    ) {
      navigate('/mypage/my-routine/my-routines');
    } else if (routineId) {
      navigate(`/routine/${routineId}`);
    } else {
      navigate('/routine');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, margin: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              {routineId ? '루틴 수정' : '새 루틴 작성'}
            </Typography>
            <FormControlLabel
              control={<Switch checked={isPublic} onChange={handleToggle} />}
              label={isPublic ? 'Public' : 'Private'}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '0.5fr 1fr',
              columnGap: '10px',
            }}
          >
            <ImageUpload onImageChange={setImage} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            </Box>
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
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {routineId ? '수정' : '등록'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NewRoutine;
