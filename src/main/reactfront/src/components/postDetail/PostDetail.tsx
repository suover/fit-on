import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonLikePost from '../common/button/ButtonLikePost';
import ButtonShare from '../common/button/ButtonShare';
import { PostWrapper, BackBtn } from './PostDetail.styles';
import { Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import CommentList from '../common/comment/CommentList';
import AuthContext from '../../context/AuthContext';

const partIdToNameMap: { [key: number]: string } = {
  1: '전신',
  2: '상체',
  3: '하체',
  4: 'None',
};
const levelIdToNameMap: { [key: number]: string } = {
  1: '상',
  2: '중',
  3: '하',
};
const goalIdToNameMap: { [key: number]: string } = {
  1: '근력 증가',
  2: '다이어트',
  3: '유연성 개선',
  4: '체력 개선',
};

type DataType = {
  postId: number | string;
  partId: number;
  levelId: number;
  goalId: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
  viewCount: number;
  likes: number;
};

interface PostDetailProps<T> {
  data: T;
  pageURL: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const PostDetail = <T extends DataType>({
  data,
  pageURL,
}: PostDetailProps<T>) => {
  const {
    title,
    userId,
    content,
    createdAt,
    comments,
    viewCount,
    likes,
    partId,
    levelId,
    goalId,
  } = data;
  const [contentData, setContentData] = useState<T>(data); // 실제 데이터가 들어오면 이용
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes); // 좋아요 수 상태 추가
  const [isShared, setIsShared] = useState(false);
  const { routineNo } = useParams<{ routineNo: string }>();
  const navigate = useNavigate();
  const { userId: currentUserId, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // 초기 로딩 시 현재 사용자가 이 게시글에 좋아요를 눌렀는지 확인
    const checkLikeStatus = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(`/api/routine/${routineNo}/likes`, {
            params: { userId: currentUserId },
          });
          setIsLiked(response.data.liked);
          setLikeCount(response.data.count); // 좋아요 수 설정
        } catch (error) {
          console.error('Error checking like status:', error);
        }
      }
    };

    checkLikeStatus();
  }, [routineNo, currentUserId, isAuthenticated]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in'); // 로그인 페이지로 리디렉션
      return;
    }

    try {
      if (isLiked) {
        await axios.post(`/api/routine/${routineNo}/unlike`, null, {
          params: { userId: currentUserId },
        });
        setIsLiked(false);
        setLikeCount((prevCount) => prevCount - 1); // 좋아요 수 감소
      } else {
        await axios.post(`/api/routine/${routineNo}/like`, null, {
          params: { userId: currentUserId },
        });
        setIsLiked(true);
        setLikeCount((prevCount) => prevCount + 1); // 좋아요 수 증가
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleShareClick = () => {
    if (data) {
      setIsShared(!isShared);
    }
  };

  const handleDeleteClick = async () => {
    if (currentUserId !== userId) {
      alert('본인 게시글만 삭제 할 수 있습니다.');
      return;
    }

    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/routine/${routineNo}`, {
          params: { userId: currentUserId },
        });
        alert('게시글이 삭제되었습니다.');
        navigate(`/${pageURL}`);
      } catch (error) {
        alert('게시글 삭제에 실패했습니다.');
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEditClick = () => {
    if (currentUserId !== userId) {
      alert('본인 게시글만 수정 할 수 있습니다.');
      return;
    }

    navigate(`/routine/new-routine`, { state: { routine: contentData } });
  };

  const partName = partId ? partIdToNameMap[partId] : '';
  const goalName = goalId ? goalIdToNameMap[goalId] : '';
  const levelName = levelId ? levelIdToNameMap[levelId] : '';

  return (
    <>
      <PostWrapper>
        {routineNo ? (
          <span>
            <ArrowForwardIosIcon />
            운동목적 : {goalName} / 난이도 : {levelName} / 운동부위 : {partName}
          </span>
        ) : (
          ''
        )}
        <h2>{title || '제목 없음'}</h2>
        <div className="postInfo">
          <span className="icon">
            <PersonIcon />
          </span>
          <span>{userId}</span>
          <div className="infos">
            <span>작성일 : {formatDate(createdAt)}</span>
            <span>{`좋아요 : ${likeCount || 0} `}</span>
            <span>{`조회수 : ${viewCount || 0}`}</span>
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            marginBottom: '50px',
          }}
        >
          <ButtonLikePost
            isLiked={isLiked}
            likeNum={likeCount}
            onClick={handleLikeClick}
          />
          <ButtonShare isShared={isShared} onClick={handleShareClick} />
        </Box>
      </PostWrapper>
      {/* <CommentList comments={comments} /> */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
            sx={{ marginRight: 1 }}
          >
            삭제
          </Button>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            수정
          </Button>
        </Box>
        <BackBtn
          onClick={() => navigate(`/${pageURL}`)}
          style={{ marginLeft: 'auto' }}
        >
          목록
        </BackBtn>
      </Box>
    </>
  );
};

export default PostDetail;
