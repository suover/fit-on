import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Link,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Calendar from '../../components/calendar/Calendar';
import AuthContext from '../../context/AuthContext';
import axios from '../../api/axiosConfig';
import ProfileImage from '../../components/common/profileImage/ProfileImage';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MyHome: React.FC = () => {
  const { name, userId } = useContext(AuthContext);
  const [statistics, setStatistics] = useState({
    communityPostCount: 0,
    communityCommentCount: 0,
    communityLikeCount: 0,
    routinePostCount: 0,
    routineCommentCount: 0,
    routineLikeCount: 0,
    infoPostCount: 0,
    infoCommentCount: 0,
    infoLikeCount: 0,
  });

  useEffect(() => {
    axios
      .get(`/api/mypage/myhome/statistics/${userId}`)
      .then((response) => {
        setStatistics(response.data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는데 실패했습니다.', error);
      });
  }, [userId]);

  return (
    <Box sx={{ marginTop: 3, flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Item
            sx={{
              backgroundColor: '#f1f1f1',
              color: '#000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              gap: '16px',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap="16px"
              flexGrow={1}
              justifyContent={'space-around'}
            >
              <ProfileImage size={52} />
              <Typography variant="h6" component="div" color="black">
                {name}님 안녕하세요.
              </Typography>
              <Button
                href="/mypage/user-info-login"
                variant="contained"
                color="primary"
                size="small"
              >
                회원정보 수정
              </Button>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: '#000', height: '64px' }}
            />
            <Box display="flex" justifyContent="center" flexGrow={2} gap="16px">
              <Box textAlign="center" flex="1">
                <Typography variant="subtitle1">글작성수</Typography>
                <Typography variant="h6" color="black">
                  {statistics.communityPostCount +
                    statistics.routinePostCount +
                    statistics.infoPostCount}
                </Typography>
              </Box>
              <Box textAlign="center" flex="1">
                <Typography variant="subtitle1">댓글수</Typography>
                <Typography variant="h6" color="black">
                  {statistics.communityCommentCount +
                    statistics.routineCommentCount +
                    statistics.infoCommentCount}
                </Typography>
              </Box>
              <Box textAlign="center" flex="1">
                <Typography variant="subtitle1">좋아요수</Typography>
                <Typography variant="h6" color="black">
                  {statistics.communityLikeCount +
                    statistics.routineLikeCount +
                    statistics.infoLikeCount}
                </Typography>
              </Box>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} marginTop={3} marginBottom={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ mb: 0 }}
            >
              나의 주문현황 (최근 6개월 기준)
            </Typography>
            <Link href="/mypage/order-history" underline="hover">
              더보기
            </Link>
          </Box>
          <Box sx={{ mt: 0 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: '#F1F1F1', width: '25%' }}
                    >
                      결제완료
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: '#F1F1F1', width: '25%' }}
                    >
                      배송준비중
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: '#F1F1F1', width: '25%' }}
                    >
                      배송중
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: '#F1F1F1', width: '25%' }}
                    >
                      배송완료
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">0 건</TableCell>
                    <TableCell align="center">0 건</TableCell>
                    <TableCell align="center">0 건</TableCell>
                    <TableCell align="center">0 건</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Calendar />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyHome;
