import React, { useContext, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';

import axios from '../../api/axiosConfig';

import { Information } from './Info';
import { Comment } from '../../components/common/comment/CommentList';
import {
  InfoWrapper,
  StateWrapper,
  DetailTitle,
  Content,
  ControllBtns,
} from '../../styles/information/InfoDetail.styles';
import CommentList from '../../components/common/comment/CommentList';

import { Container, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuthContext from '../../context/AuthContext';

const InfoDetail: React.FC = () => {
  const { infoId } = useParams<{ infoId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState<Information>();
  const [noContent, setNoContent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [infoComments, setInfoComments] = useState<Comment[]>([]);
  const [infolikes, setInfoLikes] = useState<number>(0);
  const { userRole, userId } = useContext(AuthContext);
  const sanitizedContent = info ? DOMPurify.sanitize(info.content) : '';
  const createdDate = info?.createdAt.split('T')[0];

  useEffect(() => {
    // 디테일 데이터 불러오기
    const fetchPost = async () => {
      try {
        const res = await axios.get<Information>(`/api/info/${infoId}`);

        if (res.data) {
          setInfo(res.data);
          setInfoLikes(res.data.likes);
          setNoContent(false);
          setLoading(false);
        } else {
          setNoContent(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [infoId]);

  // ------------------------댓글------------------------------
  // 댓글 불러오기
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get<Comment[]>(`/api/info/${infoId}/comments`);
        setInfoComments(res.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchComment();
  }, [infoId]);

  // 댓글 추가
  const addComment = (comment: Comment): void => {
    setInfoComments([...infoComments, comment]);
  };

  // 댓글 삭제
  const deleteComment = (commentId: number) => {
    setInfoComments(
      infoComments.filter(
        (comment) =>
          comment.commentId !== commentId &&
          comment.parentCommentId !== commentId,
      ),
    );
  };
  // 댓글 수정
  const updateComment = (commentId: number, updatedContent: string): void => {
    setInfoComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: updatedContent }
          : comment,
      ),
    );
  };
  // ------------------------댓글------------------------------

  // ------------------------좋아요----------------------------
  const handleLikeClick = async () => {
    if (userId === null) {
      alert('로그인 해주세요!');
      navigate('/sign-in');
      return;
    }

    try {
      const res = await axios.put(`/api/info/${infoId}/like`, null, {
        params: { userId },
      });

      if (res.data === 'Liked') {
        setInfoLikes((prevState) => prevState + 1);
      } else {
        setInfoLikes((prevState) => prevState - 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  // ------------------------좋아요----------------------------

  // 정보글 삭제
  const handleDelete = async () => {
    const confirmDelete = window.confirm('삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        const res = await axios.put(`/api/info/delete/${infoId}`);
        console.log('Response:', res.data);
        alert('삭제 되었습니다.');
        navigate('/info'); // 삭제 후 이동할 경로
      } catch (error) {
        console.error('Error deleting info:', error);
      }
    }
  };

  // ------------------------목록으로----------------------------
  const goToBack = () => {
    const params = new URLSearchParams(location.search);
    const filterKeyword = params.get('keyword');
    const searchKeyword = params.get('search');
    const pageParam = params.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;

    navigate(
      `/info/search?filterKeyword=${filterKeyword}&searchKeyword=${searchKeyword}&page=${page}`,
    );
  };

  // 로딩 중일때
  if (loading) {
    return (
      <StateWrapper>
        <p>Loading...</p>
      </StateWrapper>
    );
  }

  // 글이 없을 때
  if (noContent && !loading) {
    return (
      <StateWrapper>
        <p>존재하지 않는 게시글입니다. 😥</p>
        <Link to="/info">목록으로 돌아가기</Link>
      </StateWrapper>
    );
  }

  return (
    <InfoWrapper>
      <Container>
        <DetailTitle>
          <span>
            <ArrowForwardIosIcon />
            {info?.categoryName}
          </span>
          <h2>{info?.title}</h2>
          <p>
            <span>{info?.nickname}</span>
            <span>조회수 {info?.viewCount}</span>
            <span>작성일 {createdDate}</span>
          </p>
        </DetailTitle>
        <Content dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<FavoriteIcon />}
            sx={{
              width: '80px',
              height: '40px',
              borderRadius: '20px',
              padding: 'auto',
            }}
            onClick={handleLikeClick}
          >
            {infolikes}
          </Button>
        </Box>
      </Container>
      <Container sx={{ padding: '20px 0', position: 'relative' }}>
        <CommentList
          comments={infoComments}
          route={`/api/info/${infoId}`}
          postId={infoId ? infoId : ''}
          idName="infoId"
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      </Container>
      <ControllBtns>
        {userRole === 'admin' && (
          <>
            <button onClick={() => navigate(`/info/update/${infoId}`)}>
              수정
            </button>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
        <button onClick={goToBack}>목록</button>
      </ControllBtns>
    </InfoWrapper>
  );
};

export default InfoDetail;
