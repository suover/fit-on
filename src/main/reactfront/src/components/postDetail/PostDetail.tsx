import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import ButtonLikePost from '../common/button/ButtonLikePost';
import ButtonShare from '../common/button/ButtonShare';
import { PostWrapper, BackBtn } from './PostDetail.styles';
import { Box, Button, Container, Snackbar, Alert } from '@mui/material'; // Snackbar와 Alert 추가
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import AuthContext from '../../context/AuthContext';
import { Comment } from '../../components/common/comment/CommentList';
import CommentList from '../../components/common/comment/CommentList';

export const partIdToNameMap: { [key: number]: string } = {
  1: '전신',
  2: '상체',
  3: '하체',
  4: 'None',
};
export const levelIdToNameMap: { [key: number]: string } = {
  1: '상',
  2: '중',
  3: '하',
};
export const goalIdToNameMap: { [key: number]: string } = {
  1: '근력 증가',
  2: '다이어트',
  3: '유연성 개선',
  4: '체력 개선',
};

export type DataType = {
  postId: number | string;
  partId: number;
  levelId: number;
  goalId: number;
  userId: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  comments: Comment[];
  viewCount: number;
  shares: number;
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
    viewCount,
    shares,
    nickname,
    likes,
    partId,
    levelId,
    goalId,
  } = data;
  const [contentData, setContentData] = useState<T>(data);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isShared, setIsShared] = useState(false);
  const [shareCount, setShareCount] = useState(shares);
  const [comments, setComments] = useState<Comment[]>([]);
  const { routineNo } = useParams<{ routineNo: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId: currentUserId, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await axios.get(`/api/routine/${routineNo}/likes`, {
          params: { userId: currentUserId },
        });
        setIsLiked(response.data.liked);
        setLikeCount(response.data.count);
      } catch (error) {}
    };

    const checkShareStatus = async () => {
      try {
        const response = await axios.get(`/api/routine/${routineNo}/shares`, {
          params: { userId: currentUserId },
        });
        setIsShared(response.data.shared);
        setShareCount(response.data.count);
      } catch (error) {}
    };

    checkLikeStatus();
    checkShareStatus();
  }, [routineNo, currentUserId, isAuthenticated]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in');
      return;
    }
    try {
      if (isLiked) {
        await axios.post(`/api/routine/${routineNo}/unlike`, null, {
          params: { userId: currentUserId },
        });
        setIsLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await axios.post(`/api/routine/${routineNo}/like`, null, {
          params: { userId: currentUserId },
        });
        setIsLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleShareClick = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in');
      return;
    }
    try {
      if (isShared) {
        await axios.post(`/api/routine/${routineNo}/unshare`, null, {
          params: { userId: currentUserId },
        });
        alert('공유가 취소되었습니다.');
        setIsShared(false);
        setShareCount((prevCount) => prevCount - 1);
      } else {
        await axios.post(`/api/routine/${routineNo}/share`, null, {
          params: { userId: currentUserId },
        });
        alert('게시글이 공유되었습니다.');
        setIsShared(true);
        setShareCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      alert('공유 처리 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteClick = async () => {
    if (currentUserId !== userId) {
      alert('본인 게시글만 삭제 할 수 있습니다.');
      return;
    }

    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        await axios.put(`/api/routine/delete/${routineNo}`, null, {
          params: { userId: currentUserId },
        });
        alert('게시글이 삭제되었습니다.');
        navigate(`/${pageURL}`);
      } catch (error) {
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const handleEditClick = () => {
    navigate(`/routine/new-routine`, { state: { routine: contentData } });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          `/api/routine/${routineNo}/comments`,
        );
        const commentsWithReplies = response.data.map((comment) => ({
          ...comment,
          replies: [],
        }));
        setComments(commentsWithReplies);
      } catch (error) {}
    };

    fetchComments();
  }, [routineNo]);

  const addComment = (comment: Comment): void => {
    setComments([...comments, comment]);
    console.log('Added comment:', comment);
  };

  const deleteComment = (commentId: number) => {
    setComments(
      comments.filter(
        (comment) =>
          comment.commentId !== commentId &&
          comment.parentCommentId !== commentId,
      ),
    );
    console.log('Deleted comment ID:', commentId);
  };

  const updateComment = (commentId: number, updatedContent: string): void => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: updatedContent }
          : comment,
      ),
    );
  };

  const partName = partId ? partIdToNameMap[partId] : '';
  const goalName = goalId ? goalIdToNameMap[goalId] : '';
  const levelName = levelId ? levelIdToNameMap[levelId] : '';

  return (
    <>
      <PostWrapper>
        <h2>{title || '제목 없음'}</h2>
        {routineNo ? (
          <span>
            <ArrowForwardIosIcon />
            운동목적 : {goalName} / 난이도 : {levelName} / 운동부위 : {partName}
          </span>
        ) : (
          ''
        )}
        <div className="postInfo">
          <span className="icon">
            <PersonIcon />
          </span>
          <span>{nickname}</span>
          <div className="infos">
            <span>작성일 : {formatDate(createdAt)}</span>
            <span>{`공유 : ${shareCount || 0}`}</span>
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
          {currentUserId !== userId ? (
            <ButtonShare
              isShared={isShared}
              shareNum={shareCount}
              onClick={handleShareClick}
            />
          ) : null}
        </Box>
      </PostWrapper>

      <CommentList
        comments={comments}
        route={`/api/routine/${routineNo}`}
        postId={routineNo ? routineNo : ''}
        idName="routineNo"
        addComment={addComment}
        deleteComment={deleteComment}
        updateComment={updateComment}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentUserId === userId && (
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
              sx={{ marginRight: 1 }}
            >
              삭제
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              수정
            </Button>
          </Box>
        )}
        <BackBtn
          onClick={() => navigate(location.state?.from || `/${pageURL}`)}
          style={{ marginLeft: 'auto' }}
        >
          목록
        </BackBtn>
      </Box>
    </>
  );
};

export default PostDetail;
