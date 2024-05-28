// PostDetail.tsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonLikePost from '../common/button/ButtonLikePost';
import ButtonShare from '../common/button/ButtonShare';
import { PostWrapper, BackBtn } from './PostDetail.styles';
import { Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import CommentList from '../common/comment/CommentList';
import { Comment } from '../../types/MainDummyData';

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
  userId: string;
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
  const [isShared, setIsShared] = useState(false);
  const { routineNo } = useParams<{ routineNo: string }>();
  const navigate = useNavigate();

  const handleLikeClick = () => {
    if (data) {
      setIsLiked(!isLiked);
      setContentData({
        ...data,
        likes: isLiked ? data.likes - 1 : data.likes + 1,
      });
    }
  };

  const handleShareClick = () => {
    if (data) {
      setIsShared(!isShared);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/routine/${routineNo}`);
        alert('게시글이 삭제되었습니다.');
        navigate(`/${pageURL}`);
      } catch (error) {
        alert('게시글 삭제에 실패했습니다.');
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEditClick = () => {
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
          <span>
            <PersonIcon />
          </span>
          <span>{userId}</span>
          <span>작성일 : {formatDate(createdAt)}</span>
          <span>{`조회수: ${viewCount || 0}`}</span>
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
            likeNum={likes}
            onClick={handleLikeClick}
          />
          <ButtonShare isShared={isShared} onClick={handleShareClick} />
        </Box>
      </PostWrapper>
      <CommentList comments={comments} />
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
