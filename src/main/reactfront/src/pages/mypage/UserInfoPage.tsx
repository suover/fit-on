import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';
import {
  Container,
  MainBody,
  Row,
  Col,
  Card,
  CardBody,
  UserInfo,
  ButtonPrimary,
} from '../../styles/mypage/UserInfoPage.styles';
import StyledTypography from '../../styles/mypage/StyledTypography';
import { useNavigate } from 'react-router-dom';

const StyledTypographyWithMargin = styled(StyledTypography)({
  marginLeft: '20px',
  marginTop: '20px',
});

const FabContainer = styled('div')({
  position: 'relative',
});

const FloatingActionButton = styled(Fab)({
  position: 'absolute',
  right: -8,
  bottom: -8,
  width: 36,
  height: 36,
});

const UserInfoPage: React.FC = () => {
  const { userId, logout, updateAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const [isEditMainModalOpen, setIsEditMainModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [deletePassword, setDeletePassword] = useState('');
  const [deletePasswordMessage, setDeletePasswordMessage] = useState('');

  const [additionalInfo, setAdditionalInfo] = useState({
    gender: '',
    occupation: '',
    benchPress: '',
    squat: '',
    deadlift: '',
  });

  const [mainInfo, setMainInfo] = useState({
    email: '',
    name: '',
    nickname: '',
    phone: '',
    birthday: '',
    joinDate: '',
  });

  const [tempAdditionalInfo, setTempAdditionalInfo] = useState({
    ...additionalInfo,
  });
  const [tempMainInfo, setTempMainInfo] = useState({ ...mainInfo });
  const [passwordInfo, setPasswordInfo] = useState({
    password: '',
    passwordConfirm: '',
  });

  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean | null>(
    true,
  );
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] =
    useState<boolean>(true);

  const jobOptions = [
    '미선택',
    '회사원',
    '의사',
    '변호사',
    '교사',
    '엔지니어',
    '간호사',
    '공무원',
    '프로그래머',
    '영업사원',
    '운동선수',
    '회계사',
    '예술가',
    '연구원',
    '요리사',
    '작가',
    '학생',
    '기타',
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/mypage/userinfo/get-user-info', {
          params: { userId },
        });
        const userData = response.data;

        const formatDate = (dateString: string) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        setMainInfo({
          email: userData.email,
          name: userData.name,
          nickname: userData.nickname,
          phone: userData.phone,
          birthday: formatDate(userData.birthday),
          joinDate: formatDate(userData.joinDate),
        });

        setAdditionalInfo({
          gender: userData.gender || '',
          occupation: userData.occupation || '',
          benchPress: userData.benchPress || '',
          squat: userData.squat || '',
          deadlift: userData.deadlift || '',
        });
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setTempAdditionalInfo({ ...tempAdditionalInfo, [name]: value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTempAdditionalInfo({ ...tempAdditionalInfo, [name]: value });
  };

  const handleMainInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setTempMainInfo({ ...tempMainInfo, [name]: value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordInfo({ ...passwordInfo, [name]: value });

    if (name === 'password') {
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/;
      if (value === '') {
        setPasswordMessage('');
        setIsPasswordValid(true);
        if (passwordInfo.passwordConfirm === '') {
          setPasswordConfirmMessage('');
          setIsPasswordConfirmValid(true);
        }
      } else if (!regex.test(value)) {
        setPasswordMessage(
          '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.',
        );
        setIsPasswordValid(false);
      } else {
        setPasswordMessage('');
        setIsPasswordValid(true);
        if (value === passwordInfo.passwordConfirm) {
          setPasswordConfirmMessage('');
          setIsPasswordConfirmValid(true);
        } else if (passwordInfo.passwordConfirm !== '') {
          setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
          setIsPasswordConfirmValid(false);
        }
      }
    } else if (name === 'passwordConfirm') {
      if (value === '') {
        setPasswordConfirmMessage('');
        setIsPasswordConfirmValid(true);
        if (passwordInfo.password === '') {
          setPasswordMessage('');
          setIsPasswordValid(true);
        }
      } else if (value === passwordInfo.password) {
        setPasswordConfirmMessage('');
        setIsPasswordConfirmValid(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        setIsPasswordConfirmValid(false);
      }
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditInfoClick = () => {
    setTempAdditionalInfo({ ...additionalInfo });
    setIsEditInfoModalOpen(true);
  };

  const handleEditMainInfoClick = () => {
    setTempMainInfo({ ...mainInfo });
    setNicknameMessage('');
    setPhoneNumberMessage('');
    setIsNicknameValid(true);
    setIsPhoneNumberValid(true);
    setIsEditMainModalOpen(true);
  };

  const handlePasswordChangeClick = () => {
    setPasswordInfo({
      password: '',
      passwordConfirm: '',
    });
    setIsPasswordModalOpen(true);
  };

  const closeEditInfoModal = () => {
    setIsEditInfoModalOpen(false);
  };

  const closeEditMainModal = () => {
    setIsEditMainModalOpen(false);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletePassword('');
    setDeletePasswordMessage('');
  };

  const handleSaveEditInfo = async () => {
    try {
      await axios.put('/api/mypage/userinfo/update-additional-info', {
        userId,
        gender: tempAdditionalInfo.gender || null,
        occupation: tempAdditionalInfo.occupation || null,
        benchPress: tempAdditionalInfo.benchPress,
        squat: tempAdditionalInfo.squat,
        deadlift: tempAdditionalInfo.deadlift,
      });
      setAdditionalInfo(tempAdditionalInfo);
      setIsEditInfoModalOpen(false);
    } catch (error) {
      console.error('Failed to update additional info', error);
    }
  };

  const handleSaveMainInfo = async () => {
    if (!isNicknameValid || !isPhoneNumberValid || !tempMainInfo.birthday) {
      alert('유효한 정보를 입력하세요.');
      return;
    }

    if (
      tempMainInfo.nickname !== mainInfo.nickname &&
      !nicknameMessage.includes('사용 가능한 닉네임입니다.')
    ) {
      alert('닉네임 중복 확인을 해주세요.');
      return;
    }

    try {
      await axios.put('/api/mypage/userinfo/update-main-info', {
        userId,
        email: tempMainInfo.email,
        name: tempMainInfo.name,
        nickname: tempMainInfo.nickname,
        phone: tempMainInfo.phone,
        birthday: tempMainInfo.birthday,
      });

      // 업데이트된 사용자 정보 반영
      setMainInfo(tempMainInfo);

      // 기존 액세스토큰 삭제
      localStorage.removeItem('accessToken');

      // 새로운 액세스토큰 요청
      const refreshResponse = await axios.post('/api/auth/refresh');
      const newAccessToken = refreshResponse.data.accessToken;
      localStorage.setItem('accessToken', newAccessToken);

      // 상태 업데이트 호출
      updateAuthState();

      setIsEditMainModalOpen(false);
    } catch (error) {
      console.error('Failed to update main info', error);
    }
  };

  const handleSavePassword = async () => {
    if (!isPasswordValid || !isPasswordConfirmValid) {
      alert('유효한 비밀번호를 입력하세요.');
      return;
    }

    try {
      await axios.put('/api/mypage/userinfo/update-password', {
        userId,
        newPassword: passwordInfo.password,
      });
      setIsPasswordModalOpen(false);
      alert('비밀번호가 변경되었습니다.');
    } catch (error) {
      console.error('Failed to update password', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post('/api/mypage/userinfo/check-password', {
        userId,
        password: deletePassword,
      });
      if (!response.data) {
        setDeletePasswordMessage('비밀번호가 틀렸습니다.');
        return;
      }
      setIsDeleteConfirmOpen(true);
    } catch (error) {
      console.error('Failed to check password', error);
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      await axios.put('/api/mypage/userinfo/deactivate-account', {
        userId,
      });
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to delete account', error);
    }
  };

  const calculateTotalLift = useMemo(() => {
    const bench = parseInt(additionalInfo.benchPress) || 0;
    const squat = parseInt(additionalInfo.squat) || 0;
    const deadlift = parseInt(additionalInfo.deadlift) || 0;
    return bench + squat + deadlift;
  }, [
    additionalInfo.benchPress,
    additionalInfo.squat,
    additionalInfo.deadlift,
  ]);

  // 닉네임 유효성 검사
  const handleChangeNickname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

      setTempMainInfo((prev) => ({ ...prev, nickname: value }));

      if (value === '') {
        setNicknameMessage('');
        setIsNicknameValid(false);
      } else if (!regex.test(value)) {
        setNicknameMessage(
          '한글, 영어, 숫자를 포함한 2자 이상 10자 미만으로 입력해주세요',
        );
        setIsNicknameValid(false);
      } else {
        setNicknameMessage('');
        setIsNicknameValid(true);
      }
    },
    [setTempMainInfo, setIsNicknameValid, setNicknameMessage],
  );

  // 닉네임 중복 검사
  const handleCheckNicknameDuplicate = async () => {
    if (tempMainInfo.nickname === mainInfo.nickname) {
      setNicknameMessage(
        '현재 사용 중인 닉네임입니다. 새로운 닉네임을 입력하세요.',
      );
      setIsNicknameValid(false);
      return;
    }

    if (!tempMainInfo.nickname || !isNicknameValid) {
      setNicknameMessage('올바른 닉네임을 입력하세요.');
      setIsNicknameValid(false);
      return;
    }

    try {
      const response = await axios.get('/api/check-nickname', {
        params: { nickname: tempMainInfo.nickname },
      });
      if (response.data) {
        setNicknameMessage('이미 사용 중인 닉네임입니다.');
        setIsNicknameValid(false);
      } else {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setIsNicknameValid(true);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류 발생:', error);
    }
  };

  // 휴대전화 번호 유효성 검사
  const handleChangePhoneNumber = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const regex = /^01[016789][0-9]{7,8}$/;

      const formattedValue = value.replace(/-/g, '');
      setTempMainInfo((prev) => ({ ...prev, phone: formattedValue }));

      if (!regex.test(formattedValue)) {
        setPhoneNumberMessage(
          '올바른 휴대전화 번호 형식이 아닙니다. 예: 01012345678',
        );
        setIsPhoneNumberValid(false);
      } else {
        setPhoneNumberMessage('');
        setIsPhoneNumberValid(true);
      }
    },
    [setTempMainInfo, setIsPhoneNumberValid, setPhoneNumberMessage],
  );

  return (
    <Container>
      <StyledTypographyWithMargin>회원 정보</StyledTypographyWithMargin>
      <MainBody>
        <Row>
          <Col size={30}>
            <Card>
              <CardBody>
                <UserInfo>
                  <FabContainer>
                    <PersonIcon sx={{ width: 100, height: 100 }}></PersonIcon>
                    <FloatingActionButton color="primary">
                      <AddIcon />
                    </FloatingActionButton>
                  </FabContainer>
                  <div>
                    <p>{mainInfo.name + '님' || '-'}</p>
                    <p className="text-muted font-size-sm">
                      {mainInfo.nickname || '-'}
                    </p>
                  </div>
                </UserInfo>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h6" marginBottom={1}>
                  추가정보
                </Typography>
                {[
                  {
                    label: '성별',
                    value:
                      additionalInfo.gender === 'M'
                        ? '남성'
                        : additionalInfo.gender === 'F'
                          ? '여성'
                          : '-',
                  },
                  {
                    label: '직업',
                    value:
                      additionalInfo.occupation === '미선택' ||
                      additionalInfo.occupation === ''
                        ? '-'
                        : additionalInfo.occupation,
                  },
                  {
                    label: '벤치프레스',
                    value: additionalInfo.benchPress || '-',
                  },
                  { label: '스쿼트', value: additionalInfo.squat || '-' },
                  {
                    label: '데드리프트',
                    value: additionalInfo.deadlift || '-',
                  },
                  { label: '3대 몇?', value: calculateTotalLift || '-' },
                ].map((item, index) => (
                  <Box key={index}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography>{item.label}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{item.value}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Grid container justifyContent="flex-end">
                  <ButtonPrimary onClick={handleEditInfoClick}>
                    추가정보 수정
                  </ButtonPrimary>
                </Grid>
              </CardBody>
            </Card>
          </Col>

          <Col size={70}>
            <Card>
              <CardBody>
                <Typography variant="h6" marginLeft={1} marginBottom={1}>
                  내 정보
                </Typography>
                {[
                  { label: '이메일', value: mainInfo.email || '-' },
                  { label: '이름', value: mainInfo.name || '-' },
                  { label: '닉네임', value: mainInfo.nickname || '-' },
                  { label: '핸드폰', value: mainInfo.phone || '-' },
                  { label: '생년월일', value: mainInfo.birthday || '-' },
                  { label: '가입일', value: mainInfo.joinDate || '-' },
                ].map((item, index) => (
                  <div key={index}>
                    <Row>
                      <Col size={25}>
                        <Typography>{item.label}</Typography>
                      </Col>
                      <Col size={75}>
                        <Typography>{item.value}</Typography>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
                <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditMainInfoClick}
                    style={{ marginRight: '10px' }}
                  >
                    정보 수정
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handlePasswordChangeClick}
                    style={{ marginRight: '10px' }}
                  >
                    비밀번호 변경
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleDeleteClick}
                  >
                    탈퇴
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </MainBody>

      <Dialog open={isEditInfoModalOpen} onClose={closeEditInfoModal}>
        <DialogTitle style={{ marginBottom: '16px' }}>
          추가정보 수정
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth style={{ marginTop: '8px' }}>
                <InputLabel>성별</InputLabel>
                <Select
                  name="gender"
                  label="성별"
                  value={tempAdditionalInfo.gender}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>미선택</em>
                  </MenuItem>
                  <MenuItem value="M">남성</MenuItem>
                  <MenuItem value="F">여성</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>직업</InputLabel>
                <Select
                  name="occupation"
                  label="직업"
                  value={tempAdditionalInfo.occupation}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>미선택</em>
                  </MenuItem>
                  {jobOptions.slice(1).map((job, index) => (
                    <MenuItem key={index} value={job}>
                      {job}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="벤치프레스 (kg)"
                name="benchPress"
                value={tempAdditionalInfo.benchPress}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="스쿼트 (kg)"
                name="squat"
                value={tempAdditionalInfo.squat}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="데드리프트 (kg)"
                name="deadlift"
                value={tempAdditionalInfo.deadlift}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditInfoModal} color="secondary">
            취소
          </Button>
          <Button onClick={handleSaveEditInfo} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditMainModalOpen} onClose={closeEditMainModal}>
        <DialogTitle>내 정보 수정</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: '16px' }}></div>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                label="이메일"
                name="email"
                value={tempMainInfo.email}
                onChange={handleMainInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="이름"
                name="name"
                value={tempMainInfo.name}
                onChange={handleMainInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <TextField
                    label="닉네임"
                    name="nickname"
                    value={tempMainInfo.nickname}
                    onChange={handleChangeNickname}
                    fullWidth
                    helperText={nicknameMessage}
                    FormHelperTextProps={{
                      style: {
                        color: isNicknameValid === false ? 'red' : 'blue',
                        position: 'absolute',
                        bottom: '-20px',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: '56px' }}
                    onClick={handleCheckNicknameDuplicate}
                  >
                    중복 확인
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="핸드폰"
                name="phone"
                value={tempMainInfo.phone}
                onChange={handleChangePhoneNumber}
                fullWidth
                helperText={phoneNumberMessage}
                FormHelperTextProps={{
                  style: {
                    color: isPhoneNumberValid === false ? 'red' : 'black',
                    position: 'absolute',
                    bottom: '-20px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="생년월일"
                name="birthday"
                type="date"
                value={tempMainInfo.birthday}
                onChange={handleMainInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditMainModal} color="secondary">
            취소
          </Button>
          <Button onClick={handleSaveMainInfo} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isPasswordModalOpen} onClose={closePasswordModal}>
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: '16px' }}></div>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                label="새 비밀번호"
                name="password"
                type="password"
                value={passwordInfo.password}
                onChange={handlePasswordChange}
                fullWidth
                helperText={passwordMessage}
                FormHelperTextProps={{
                  style: {
                    color: 'red',
                    position: 'absolute',
                    bottom: '-20px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                value={passwordInfo.passwordConfirm}
                onChange={handlePasswordChange}
                fullWidth
                helperText={passwordConfirmMessage}
                FormHelperTextProps={{
                  style: {
                    color: 'red',
                    position: 'absolute',
                    bottom: '-20px',
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePasswordModal} color="secondary">
            취소
          </Button>
          <Button onClick={handleSavePassword} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DialogTitle>회원 탈퇴</DialogTitle>
        <DialogContent style={{ width: '400px', height: '100px' }}>
          <Typography style={{ marginBottom: '20px' }}>
            회원 탈퇴를 원하시면 비밀번호를 입력하세요.
          </Typography>
          <TextField
            label="비밀번호"
            name="deletePassword"
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            fullWidth
            helperText={deletePasswordMessage}
            FormHelperTextProps={{
              style: {
                color: 'red',
                position: 'absolute',
                bottom: '-20px',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal} color="secondary">
            취소
          </Button>
          <Button onClick={handleDeleteAccount} color="primary">
            회원탈퇴
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <DialogTitle>회원 탈퇴 확인</DialogTitle>
        <DialogContent style={{ width: '300px', height: '30px' }}>
          <Typography>정말로 탈퇴하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteConfirmOpen(false)}
            color="secondary"
          >
            취소
          </Button>
          <Button onClick={confirmDeleteAccount} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserInfoPage;
