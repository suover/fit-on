import React, { useCallback, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GenericButton from '../../components/common/genericButton/GenericButton';
import {
  SignupButtons,
  SignupForm,
} from '../../styles/signup/SignupPage.styles';
const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  //이메일, 아이디, 비밀번호, 비밀번호 재입력, 생년월일, 휴대폰 번호 확인.
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  //유효성 검사.
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
  const [isBirthday, setIsBirthday] = useState<boolean>(false);

  //오류 메세지
  const [nicknameMessage, setNicknameMessage] = useState<String>('');
  const [passwordMessage, setPasswordMessage] = useState<String>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<String>('');
  const [emailMessage, setEmailMessage] = useState<String>('');
  const [nameMessage, setNameMessage] = useState<string>('');
  const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>('');

  //이메일 유효성 검사
  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      setEmail(value);

      if (!regex.test(value)) {
        setEmailMessage('@를 포함하여 올바른 이메일 주소를 입력하세요.');
        setIsEmail(false);
      } else {
        setEmailMessage('');
        setIsEmail(true);
      }
    },
    [setEmail, setIsEmail, setEmailMessage],
  );
  //닉네임 유효성 검사
  const handleChangeId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

      setNickname(value);

      if (!regex.test(value)) {
        setNicknameMessage(
          '한글, 영어, 숫자를 포함한 2자 이상 10자 미만으로 입력해주세요',
        );
        setIsNickname(false);
      } else {
        setNicknameMessage('');
        setIsNickname(true);
      }
    },
    [setNickname, setIsNickname, setNicknameMessage],
  );
  // 비밀번호 유효성 검사
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{5,}$/;

      setPassword(value);

      if (!regex.test(value)) {
        setPasswordMessage(
          '비밀번호는 5자 이상이며, 소문자, 숫자, 특수문자를 포함해야 합니다.',
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('');
        setIsPassword(true);
      }
    },
    [setPassword, setIsPassword, setPasswordMessage],
  );
  //비밀번호 재입력 유효성 검사
  const handleChangePasswordConfirm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordConfirm(value);

      if (value === password) {
        setPasswordConfirmMessage('비밀번호가 일치합니다.');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        setIsPasswordConfirm(false);
      }
    },
    [
      password,
      setPasswordConfirm,
      setIsPasswordConfirm,
      setPasswordConfirmMessage,
    ],
  );
  // 이름 유효성 검사
  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const regex = /^[가-힣a-zA-Z]+$/;

      setName(value);

      if (!value || value.length < 2 || !regex.test(value)) {
        setNameMessage('이름은 2글자 이상의 한글 또는 영문이어야 합니다.');
        setIsName(false);
      } else {
        setNameMessage('');
        setIsName(true);
      }
    },
    [setName, setIsName, setNameMessage],
  );

  // 휴대전화 번호 유효성 검사
  const handleChangePhoneNumber = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

      setPhonenumber(value);

      if (!regex.test(value)) {
        setPhoneNumberMessage(
          '올바른 휴대전화 번호 형식이 아닙니다. 예: 01012345678',
        );
        setIsPhoneNumber(false);
      } else {
        setPhoneNumberMessage('');
        setIsPhoneNumber(true);
      }
    },
    [setPhonenumber, setIsPhoneNumber, setPhoneNumberMessage],
  );
  // 생년월일
  const handleChangeBirthday = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      setBirthday(`${year}-${month}-${day}`);
      setIsBirthday(true);
    },
    [],
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 각 입력 필드의 누락을 검사
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    } else if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    } else if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    } else if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    } else if (!name) {
      alert('이름을 입력해주세요.');
      return;
    } else if (!phonenumber) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    } else if (!birthday) {
      alert('생년월일을 입력해주세요.');
      return;
    }
    console.log('회원가입이 완료 되었습니다', {
      email,
      nickname,
      password,
      name,
      phonenumber,
      birthday,
    });
    navigate('/sign-in');
  };

  return (
    <SignupForm>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" variant="standard">
          <Box
            style={{
              paddingBottom: '20px',
              marginBottom: '20px',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', marginTop: '20px' }}
              textAlign="center"
              variant="h4"
            >
              회원가입
            </Typography>
            <Box display="flex">
              <TextField
                fullWidth
                margin="normal"
                label="이메일"
                placeholder="이메일"
                id="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
                error={!isEmail && emailMessage !== ''}
                helperText={!isEmail ? emailMessage : ''}
                InputProps={{
                  style: {
                    borderRadius: '12px',
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& label.Mui-focused': {
                    color: 'black', // 포커스 상태에서 레이블 색상 변경
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black', // 여기에서 테두리 색상을 설정합니다.
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black', // 포커스 상태의 테두리 색상을 배경색과 동일하게 설정
                      borderWidth: 1,
                    },
                  },
                  minHeight: '80px',
                }}
              />
              <GenericButton
                style={{
                  fontSize: '1rem',
                  marginTop: '15px',
                  marginLeft: '17px',
                  width: '130px',
                  height: '57px',
                }}
              >
                중복 확인
              </GenericButton>
            </Box>
            <Box display="flex">
              <TextField
                fullWidth
                placeholder="한글, 영문, 숫자 2~10자"
                margin="normal"
                id="nickname"
                name="nickname"
                label="닉네임"
                value={nickname}
                onChange={handleChangeId}
                error={!isNickname && nicknameMessage !== ''}
                helperText={!isNickname ? nicknameMessage : ''}
                InputProps={{
                  style: {
                    borderRadius: '12px',
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                      borderWidth: 1,
                    },
                  },
                  minHeight: '80px',
                }}
              />
              <GenericButton
                style={{
                  fontSize: '1rem',
                  marginTop: '15px',
                  marginLeft: '17px',
                  width: '130px',
                  height: '57px',
                }}
              >
                중복 확인
              </GenericButton>
            </Box>
            <TextField
              fullWidth
              placeholder="숫자, 영문, 특수문자 조합 최소 5자"
              margin="normal"
              type="password"
              id="password"
              name="password"
              label="비밀번호"
              value={password}
              onChange={handleChangePassword}
              error={!isPassword && passwordMessage !== ''}
              helperText={!isPassword ? passwordMessage : ''}
              InputProps={{
                style: {
                  borderRadius: '12px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& label.Mui-focused': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                },
                minHeight: '80px',
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              type="password"
              id="repassword"
              name="repassword"
              label="비밀번호 재입력"
              placeholder="비밀번호 재입력"
              value={passwordConfirm}
              onChange={handleChangePasswordConfirm}
              error={!isPasswordConfirm && passwordConfirmMessage !== ''}
              helperText={!isPasswordConfirm ? passwordConfirmMessage : ''}
              InputProps={{
                style: {
                  borderRadius: '12px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& label.Mui-focused': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                },
                minHeight: '80px',
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label="이름"
              placeholder="홍길동"
              value={name}
              onChange={handleChangeName}
              error={!isName && name.length > 0}
              helperText={!isName && name.length > 0 ? nameMessage : ''}
              InputProps={{
                style: {
                  borderRadius: '12px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& label.Mui-focused': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                },
                minHeight: '80px',
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              id="phoneNumber"
              name="phoneNumber"
              label="휴대전화"
              placeholder="휴대폰 번호 `-` 제외하고 입력"
              value={phonenumber}
              onChange={handleChangePhoneNumber}
              error={!isPhoneNumber && phonenumber.length > 0}
              helperText={
                !isPhoneNumber && phonenumber.length > 0
                  ? phoneNumberMessage
                  : ''
              }
              InputProps={{
                style: {
                  borderRadius: '12px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& label.Mui-focused': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                },
                minHeight: '80px',
              }}
            />
            <TextField
              fullWidth
              label="생년월일"
              margin="normal"
              value={birthday}
              variant="outlined"
              type="date"
              onChange={handleChangeBirthday}
              InputProps={{
                style: {
                  borderRadius: '12px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& label.Mui-focused': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                },
                minHeight: '80px',
              }}
            />
            <SignupButtons>
              <Link to="/sign-in" style={{ width: '48%' }}>
                <GenericButton
                  style={{ fontSize: '1.1rem', width: '100%', height: '40px' }}
                >
                  취소
                </GenericButton>
              </Link>
              <GenericButton
                style={{ fontSize: '1.1rem', width: '48%', height: '40px' }}
                type="submit"
              >
                가입
              </GenericButton>
            </SignupButtons>
          </Box>
        </FormControl>
        <Typography
          variant="body2"
          margin="normal"
          style={{ marginTop: '20px', textAlign: 'center' }}
        >
          <Link
            to="/service"
            style={{
              marginRight: '10px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            개인정보 처리방침
          </Link>
          |
          <Link
            to="/service"
            style={{
              margin: '0 10px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            이용약관
          </Link>
          |
          <Link
            to="/service"
            style={{
              marginLeft: '10px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            회원정보 고객센터
          </Link>
        </Typography>
      </form>
    </SignupForm>
  );
};

export default SignupPage;
