import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axiosConfig';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PostDetailWrapper } from '../../styles/community/CommunityDetail.styles';
import {
  PostWrapper,
  BackBtn,
  RedBtn,
} from '../../components/postDetail/PostDetail.styles';
import { Comment } from '../../types/CommentTypes';

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
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);

  // 글 조회
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await axios.get<Post>(
            `/api/community/posts/${postId}`,
          );
          setPost(response.data);
          setLikeCount(response.data.likes);
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
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          `/api/community/${postId}/comments`,
        );
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

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

  //좋아요
  const handleLikeClick = async () => {
    if (userId === null) {
      alert('로그인 해주세요!');
      navigate('/sign-in');
      return;
    }

    try {
      const res = await axios.post(
        `/api/community/posts/${postId}/like`,
        null,
        {
          params: { userId },
        },
      );

      if (res.data === 'Liked') {
        setLikes((prevState) => prevState + 1);
      } else {
        setLikes((prevState) => Math.max(prevState - 1, 0)); // 음수로 내려가지 않도록 설정
      }
    } catch (error) {
      console.error('Error toggling like:', error);
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
      try {
        await axios.put(`/api/community/posts/${postId}/delete`);
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

  // 댓글 추가
  const addComment = (comment: Comment): void => {
    setComments([...comments, comment]);
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
      <Container maxWidth="lg" sx={{ minHeight: '700px' }}>
        <PostWrapper>
          <h2>{post.title || '제목 없음'}</h2>
          {post.categoryName ? (
            <span>
              <ArrowForwardIosIcon />
              {post.categoryName}
            </span>
          ) : (
            ''
          )}
          <div className="postInfo">
            <span className="icon">
              <PersonIcon />
            </span>
            <span>{post.nickname}</span>
            <div className="post-meta">
              <span>{formatDate(post.createdAt)}</span>
              <span>{`조회수: ${post.viewCount}`}</span>
            </div>
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
              {likes}
            </Button>
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
          {isAuthenticated && post.userId === userId && (
            <>
              <BackBtn onClick={handleEditClick}>수정</BackBtn>
              <RedBtn onClick={handleClickOpen}>삭제</RedBtn>
            </>
          )}
          <BackBtn onClick={() => navigate('/community')}>목록</BackBtn>
        </Box>
        {/* <Container sx={{ position: 'relative' }}> */}
        <CommentList
          comments={comments}
          route={`/api/community/${postId}`}
          postId={postId ? postId : ''}
          idName="communityId"
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
        {/* </Container> */}
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
    </PostDetailWrapper>
  );
};

export default ViewPostDetail;
