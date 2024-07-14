import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import AuthContext from '../../context/AuthContext';
import CommentList from '../../components/common/comment/CommentList';
import ButtonLikePost from '../../components/common/button/ButtonLikePost';
import { PostDetailWrapper } from '../../styles/community/CommunityDetail.styles';
import {
  PostWrapper,
  BackBtn,
  RedBtn,
} from '../../components/postDetail/PostDetail.styles';
import { Comment } from '../../types/CommentTypes';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Post {
  communityId: number;
  userId: number;
  postId: number;
  categoryId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  isDeleted: boolean;
  nickname: string;
  categoryName: string;
  comments: Comment[];
  likes: number;
}

const ViewPostDetail = () => {
  const { postId } = useParams<{ postId: string }>(); // URL 파라미터에서 postId 가져오기
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [open, setOpen] = useState(false); // Dialog open 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // 글 조회
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get<Post>(
            `/api/community/posts/${postId}`,
          );
          console.log('#####Fetched post:', response.data); // API 응답 데이터 확인@@
          setPost(response.data);
          setLikeCount(response.data.likes);
          await fetchComments(response.data.communityId);
        } catch (error) {
          console.error(
            'Error fetching post: 게시물 가져오는 중 오류 발생',
            error,
          );
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    } else {
      setLoading(false);
    }
  }, [postId]);

  //댓글조회
  const fetchComments = async (communityId: number) => {
    try {
      const response = await axiosInstance.get<Comment[]>(
        `/api/community/${postId}/comments`,
      );
      setComments(
        response.data.map((comment) => ({
          ...comment,
          isDeleted: comment.isDeleted || false, // 기본값 설정
        })),
      );
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

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
    if (post) {
      try {
        if (isLiked) {
          await axiosInstance.post(`/api/community/posts/${postId}/unlike`);
          setLikeCount(likeCount - 1);
        } else {
          await axiosInstance.post(`/api/community/posts/${postId}/like`);
          setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
      } catch (error) {
        console.error('Error updating like:', error);
      }
    }
  };

  //글 수정
  const handleEditClick = () => {
    if (post) {
      navigate(`/community/edit/${postId}`);
    }
  };

  //글 삭제
  const handleDeleteClick = async () => {
    if (post && post.communityId) {
      console.log(`########## Deleting post with id: ${postId}`); // 로그 추가
      try {
        await axiosInstance.delete(`/api/community/posts/${postId}`);
        navigate('/community');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    } else {
      console.error('Post ID is undefined');
    }
  };
  //삭제 버튼 클릭 시 다이얼로그 오픈
  const handleClickOpen = () => {
    setOpen(true);
  };
  //다이얼로그 취소
  const handleClose = () => {
    setOpen(false);
  };

  //---------------------------댓글--------------------------------------

  // // 댓글 추가
  // const addComment = async (comment: Comment): Promise<void> => {
  //   if (isSubmitting) return;
  //   setIsSubmitting(true);

  //   try {
  //     const response = await axiosInstance.post<Comment>(
  //       `/api/community/${postId}/newComments`,
  //       comment,
  //     );
  //     const newComment = response.data;
  //     console.log('* New Comment:', newComment); // 댓글 생성 후 반환된 데이터 로그
  //     setComments((prevComments) => [...prevComments, newComment]);
  //   } catch (error) {
  //     console.error('*****Error adding comment:', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // // 댓글 삭제
  // const deleteComment = async (commentId: number) => {
  //   try {
  //     await axiosInstance.delete(
  //       `/api/community/${postId}/${commentId}/delete`,
  //     );
  //     setComments(
  //       comments.filter(
  //         (comment) =>
  //           comment.commentId !== commentId &&
  //           comment.parentCommentId !== commentId,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error('*****Error deleting comment:', error);
  //   }
  // };

  // // 댓글 업데이트 함수
  // const updateComment = async (
  //   commentId: number,
  //   updatedContent: string,
  // ): Promise<void> => {
  //   try {
  //     const response = await axiosInstance.put<Comment>(
  //       `/api/community/${postId}/${commentId}/update`,
  //       { content: updatedContent },
  //     );
  //     const updatedComment = response.data;
  //     setComments((prevComments) =>
  //       prevComments.map((comment) =>
  //         comment.commentId === commentId ? updatedComment : comment,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error('*****Error updating comment:', error);
  //   }
  // };

  // 댓글 추가
  const addComment = (comment: Comment): void => {
    setComments([...comments, comment]);
    console.log(comment);
  };

  // 댓글 삭제
  const deleteComment = (commentId: number) => {
    setComments(
      comments.filter(
        (comment) =>
          comment.commentId !== commentId &&
          comment.parentCommentId !== commentId,
      ),
    );
  };
  // 댓글 수정
  const updateComment = (commentId: number, updatedContent: string): void => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: updatedContent }
          : comment,
      ),
    );
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '700px',
          padding: '50px 0 100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '700px',
          padding: '50px 0 100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">게시글을 불러오는 데 실패했습니다.</Typography>
      </Container>
    );
  }

  return (
    <PostDetailWrapper>
      <Container
        maxWidth="lg"
        sx={{ minHeight: '700px', padding: '50px 0 100px' }}
      >
        <PostWrapper>
          {post.categoryName ? (
            <span>
              <ArrowForwardIosIcon />
              {post.categoryName}
            </span>
          ) : (
            ''
          )}
          <h2>{post.title || '제목 없음'}</h2>
          <div className="postInfo">
            <span>
              <PersonIcon />
            </span>
            <span>{post.nickname}</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>{`조회수: ${post.viewCount || 1}`}</span>
          </div>
          <div className="content">
            <Box dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
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
          {isAuthenticated && (
            <>
              <BackBtn onClick={handleEditClick}>수정</BackBtn>
              <RedBtn onClick={handleClickOpen}>삭제</RedBtn>
            </>
          )}
          <BackBtn onClick={() => navigate('/community')}>목록</BackBtn>
        </Box>
        <Container sx={{ padding: '20px 0', position: 'relative' }}>
          <CommentList
            comments={comments} // 상태에서 가져온 댓글 목록을 전달
            // route={`api/community/${postId || ''}`}
            route={`api/community/${postId}`}
            // postId={postId || ''}
            postId={postId ? postId : ''}
            idName="communityId"
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
          />
        </Container>
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
      </Container>
    </PostDetailWrapper>
  );
};

export default ViewPostDetail;
