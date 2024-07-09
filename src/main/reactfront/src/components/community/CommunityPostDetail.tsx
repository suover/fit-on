import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonLikePost from '../common/button/ButtonLikePost';
import { PostWrapper, BackBtn, RedBtn } from '../postDetail/PostDetail.styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import AuthContext from '../../context/AuthContext';
import { Comment } from '../common/comment/CommentList'; // Comment 타입 가져오기

type DataType = {
  communityId: number | string;
  categoryName?: string;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
  viewCount: number;
  likes: number;
  // communityId: number;
};

interface PostDetailProps<T> {
  data: T;
  pageURL: string;
}

const CommunityPostDetail = <T extends DataType>({
  data,
  pageURL,
}: PostDetailProps<T>) => {
  const {
    title,
    nickname,
    content,
    createdAt,
    comments,
    categoryName,
    viewCount,
    likes,
    communityId,
  } = data;

  console.log('*******Post data: ', data);

  const [contentData, setcontentData] = useState<T>(data); // 실제 데이터가 들어오면 이용
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isShared, setisShared] = useState(false);
  const [open, setOpen] = useState(false); // Dialog open 상태 관리
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date'; // 날짜가 유효하지 않을 때 처리
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const handleLikeClick = async () => {
    if (data) {
      try {
        if (isLiked) {
          await axios.post(
            `http://localhost:8080/api/community/posts/${communityId}/unlike`,
          );
          setLikeCount(likeCount - 1);
        } else {
          await axios.post(
            `http://localhost:8080/api/community/posts/${communityId}/like`,
          );
          setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
      } catch (error) {
        console.error('Error updating like:', error);
      }
    }
  };

  const handleShareClick = () => {
    if (data) {
      setisShared(!isShared);
    }
  };

  const handleEditClick = () => {
    navigate(`/community/edit/${communityId}`);
  };

  const handleDeleteClick = async () => {
    //추가
    if (!communityId) {
      console.error('Post ID is undefined');
      return;
    }
    console.log(`########## Deleting post with id: ${communityId}`); // 로그 추가
    try {
      await axios.delete(
        `http://localhost:8080/api/community/posts/${communityId}`,
      );
      navigate(`/${pageURL}`);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleClickOpen = () => {
    console.log('Opening delete confirmation dialog'); // 로그 추가
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PostWrapper>
        {categoryName ? (
          <span>
            <ArrowForwardIosIcon />
            {categoryName}
          </span>
        ) : (
          ''
        )}
        <h2>{title || '제목 없음'}</h2>
        <div className="postInfo">
          <span>
            <PersonIcon />
          </span>
          <span>{nickname}</span>
          <span>{formatDate(createdAt)}</span>
          <span>{`조회수: ${viewCount || 1}`}</span>
        </div>
        {/* 글내용 부분 */}
        <div className="content">
          <Box dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {/* 좋아요 */}
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
        </Box>
      </PostWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {isAuthenticated && ( // 로그인된 경우에만 수정 및 삭제 버튼을 표시
          <>
            <BackBtn onClick={handleEditClick}>수정</BackBtn>
            <RedBtn onClick={handleClickOpen}>삭제</RedBtn>
          </>
        )}
        <BackBtn onClick={() => navigate(`/${pageURL}`)}>목록</BackBtn>
      </Box>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'삭제 확인'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말 게시글을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleDeleteClick} color="secondary" autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommunityPostDetail;
