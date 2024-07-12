import React, { useState, useContext, useEffect } from 'react';
import { Container } from '@mui/material';
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
import CommunityCommentList from '../../components/community/CommunityCommentList';
import { Comment } from '../../types/CommentTypes';

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
    comments = [], // comments가 undefined일 경우 빈 배열로 초기화
    categoryName,
    viewCount,
    likes,
    communityId,
  } = data;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [open, setOpen] = useState(false); // Dialog open 상태 관리
  const [postComments, setPostComments] = useState<Comment[]>(
    comments.map((comment) => ({
      ...comment,
      isDeleted: comment.isDeleted || false, // 기본값 설정
    })),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    setPostComments(
      comments.map((comment) => ({
        ...comment,
        isDeleted: comment.isDeleted || false, // 기본값 설정
      })),
    );
  }, [comments]);

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 댓글 추가 함수
  const addComment = async (comment: Comment): Promise<void> => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post<Comment>(
        `http://localhost:8080/api/community/posts/${communityId}/newComments`,
        comment,
      );
      const newComment = response.data;
      console.log('* New Comment:', newComment); // 댓글 생성 후 반환된 데이터 로그
      setPostComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error('*****Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 삭제 함수
  const deleteComment = async (commentId: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/community/comments/${commentId}`,
      );
      setPostComments(
        postComments.filter(
          (comment) =>
            comment.commentId !== commentId &&
            comment.parentCommentId !== commentId,
        ),
      );
    } catch (error) {
      console.error('*****Error deleting comment:', error);
    }
  };

  // 댓글 업데이트 함수
  const updateComment = async (
    commentId: number,
    updatedContent: string,
  ): Promise<void> => {
    try {
      const response = await axios.put<Comment>(
        `http://localhost:8080/api/community/comments/${commentId}`,
        { content: updatedContent },
      );
      const updatedComment = response.data;
      setPostComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId ? updatedComment : comment,
        ),
      );
    } catch (error) {
      console.error('*****Error updating comment:', error);
    }
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
      <Container sx={{ padding: '20px 0', position: 'relative' }}>
        <CommunityCommentList
          comments={postComments} // 상태에서 가져온 댓글 목록을 전달
          route={`api/community/posts/${communityId}`}
          postId={communityId.toString()}
          idName="communityId"
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      </Container>

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
