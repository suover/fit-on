import React, { useContext, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { Information } from './Info';
import { Comment } from '../../components/common/comment/CommentList';
import {
  InfoWrapper,
  NoContentWrapper,
  DetailTitle,
  Content,
  ControllBtns,
} from '../../styles/information/InfoDetail.styles';
import CommentList from '../../components/common/comment/CommentList';

import { Container, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuthContext from '../../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const InfoDetail: React.FC = () => {
  const { infoId } = useParams<{ infoId: string }>();
  const navigate = useNavigate();
  const [info, setInfo] = useState<Information>();
  const [noContent, setNoContent] = useState<boolean>(false);
  const [infoComments, setInfoComments] = useState<Comment[]>([]);
  const [infolikes, setInfoLikes] = useState<number>(53);
  const [isLike, setIsLike] = useState<boolean>(false);
  const { userRole } = useContext(AuthContext);
  const sanitizedContent = info ? DOMPurify.sanitize(info.content) : '';
  const createdDate = info?.createdAt.split('T')[0];

  useEffect(() => {
    // 디테일 데이터 불러오기
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get<Information>(`/info/${infoId}`);

        if (!res.data) {
          setNoContent(true);
        } else {
          setInfo(res.data);
          setInfoLikes(res.data.likes);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [infoId]);

  const handleLikeClick = (): void => {
    setIsLike((prevState) => !prevState);
    if (!isLike) {
      setInfoLikes(infolikes + 1);
    } else {
      setInfoLikes(infolikes - 1);
    }
  };

  useEffect(() => {
    // 댓글 불러오기
    const fetchComment = async () => {
      try {
        const res = await axiosInstance.get<Comment[]>(
          `info/${infoId}/comments`,
        );
        setInfoComments(res.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchComment();
  }, [infoId]);

  const addComment = (comment: Comment): void => {
    setInfoComments([...infoComments, comment]);
    console.log(comment);
  };

  const deleteComment = (commentId: number) => {
    setInfoComments(
      infoComments.filter(
        (comment) =>
          comment.commentId !== commentId &&
          comment.parentCommentId !== commentId,
      ),
    );
  };

  const updateComment = (commentId: number, updatedContent: string): void => {
    setInfoComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: updatedContent }
          : comment,
      ),
    );
  };

  if (noContent) {
    return (
      <NoContentWrapper>
        <p>존재하지 않는 게시글입니다. 😥</p>
      </NoContentWrapper>
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
          route={`api/info/${infoId}`}
          postId={infoId ? infoId : ''}
          idName="infoId"
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      </Container>
      <ControllBtns>
        {userRole === 'admin' && (
          <button onClick={() => navigate(`/info/update/${infoId}`)}>
            수정
          </button>
        )}
        <button onClick={() => navigate('/info')}>목록</button>
      </ControllBtns>
    </InfoWrapper>
  );
};

export default InfoDetail;
