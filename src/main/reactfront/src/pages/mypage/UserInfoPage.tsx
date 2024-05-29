import React, { useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import {
  Container,
  MainBody,
  Row,
  Col,
  Card,
  CardBody,
  UserImage,
  UserInfo,
  ButtonPrimary,
} from '../../styles/mypage/UserInfoPage.styles';
import StyledTypography from '../../styles/mypage/StyledTypography';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const [isEditMainModalOpen, setIsEditMainModalOpen] = useState(false);

  const [additionalInfo, setAdditionalInfo] = useState({
    gender: 'male',
    job: '헬스트레이너',
    benchPress: '150',
    squat: '100',
    deadlift: '30',
  });

  const [mainInfo, setMainInfo] = useState({
    email: 'example@domain.com',
    name: '홍길동',
    password: '',
    passwordConfirm: '',
    nickname: 'nickname',
    phone: '010-1111-1111',
    birthday: '1990-01-01',
  });

  const jobOptions = [
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setAdditionalInfo({ ...additionalInfo, [name]: value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdditionalInfo({ ...additionalInfo, [name]: value });
  };

  const handleMainInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setMainInfo({ ...mainInfo, [name]: value });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalInfo({ ...additionalInfo, gender: event.target.value });
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditInfoClick = () => {
    setIsEditInfoModalOpen(true);
  };

  const handleEditMainInfoClick = () => {
    setIsEditMainModalOpen(true);
  };

  const closeEditInfoModal = () => {
    setIsEditInfoModalOpen(false);
  };

  const closeEditMainModal = () => {
    setIsEditMainModalOpen(false);
  };

  const handleSaveEditInfo = () => {
    setIsEditInfoModalOpen(false);
  };

  const handleSaveMainInfo = () => {
    if (mainInfo.password !== mainInfo.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsEditMainModalOpen(false);
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
                    <UserImage
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                    />
                    <FloatingActionButton color="primary">
                      <AddIcon />
                    </FloatingActionButton>
                  </FabContainer>
                  <div>
                    <p>홍길동</p>
                    <p className="text-secondary mb-1">example@domain.com</p>
                    <p className="text-muted font-size-sm">nickname</p>
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
                    value: additionalInfo.gender === 'male' ? '남성' : '여성',
                  },
                  { label: '직업', value: additionalInfo.job || '-' },
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
                    수정
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
                  { label: '이메일', value: mainInfo.email },
                  { label: '이름', value: mainInfo.name },
                  { label: '비밀번호', value: '**********' },
                  { label: '닉네임', value: mainInfo.nickname },
                  { label: '핸드폰', value: mainInfo.phone },
                  { label: '생년월일', value: mainInfo.birthday },
                  { label: '가입일', value: '2022-01-01' },
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
                    수정
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
        <DialogTitle>추가 정보 수정</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>성별</Typography>
              <RadioGroup
                row
                value={additionalInfo.gender}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="남성"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="여성"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>직업</InputLabel>
                <Select
                  name="job"
                  value={additionalInfo.job}
                  onChange={handleSelectChange}
                >
                  {jobOptions.map((job, index) => (
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
                value={additionalInfo.benchPress}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="스쿼트 (kg)"
                name="squat"
                value={additionalInfo.squat}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="데드리프트 (kg)"
                name="deadlift"
                value={additionalInfo.deadlift}
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
          <div style={{ marginBottom: '16px' }}></div>{' '}
          <Grid container spacing={3}>
            {' '}
            <Grid item xs={12}>
              <TextField
                label="이메일"
                name="email"
                value={mainInfo.email}
                onChange={handleMainInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="이름"
                name="name"
                value={mainInfo.name}
                onChange={handleMainInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="새 비밀번호"
                name="password"
                type="password"
                value={mainInfo.password}
                onChange={handleMainInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                value={mainInfo.passwordConfirm}
                onChange={handleMainInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <TextField
                    label="닉네임"
                    name="nickname"
                    value={mainInfo.nickname}
                    onChange={handleMainInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: '56px' }}
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
                value={mainInfo.phone}
                onChange={handleMainInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="생년월일"
                name="birthday"
                type="date"
                value={mainInfo.birthday}
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
    </Container>
  );
};

export default UserInfoPage;
