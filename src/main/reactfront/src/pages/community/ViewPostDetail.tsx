import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommunityPostDetail from '../../components/community/CommunityPostDetail';
import { PostDetailWrapper } from '../../styles/community/CommunityDetail.styles';
import CommentList, {
  Comment,
} from '../../components/community/CommunityCommentList';
import axiosInstance from '../../types/AxiosInstance';

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
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 댓글 목록 불러오기
  const fetchComments = async (communityId: number) => {
    try {
      const response = await axiosInstance.get<Comment[]>(
        `/api/community/posts/${communityId}/comments`,
      );
      setPostComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    if (postId) {
      // console.log(`Fetching post with id: ${postId}`); //로그 @@

      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get<Post>(
            `/api/community/posts/${postId}`,
          );
          console.log('#####Fetched post:', response.data); // API 응답 데이터 확인@@
          setPost(response.data);
          setPostComments(response.data.comments || []); // comments가 없을 경우 빈 배열로 초기화
        } catch (error) {
          console.error(
            'Error fetching post:게시물 가져오는 중 오류 발생',
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

  // useEffect(() => {
  //   console.log('postComments type:', Array.isArray(postComments));
  //   console.log('postComments value:', postComments);
  // }, [postComments]);

  // 댓글 추가
  const addComment = async (comment: Comment): Promise<void> => {
    if (isSubmitting) return; // 이미 제출 중인 경우 중복 호출 방지
    setIsSubmitting(true);

    try {
      // 댓글 등록 API 호출
      // const response = await axios.post<Comment>(
      const response = await axiosInstance.post<Comment>(
        `/api/community/posts/${postId}/newComments`,
        comment,
      );
      if (post) {
        //추가***
        await fetchComments(post.communityId);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false); // 제출 완료 후 다시 제출 가능하도록 설정
    }
  };

  // 댓글 삭제
  const deleteComment = (commentId: number) => {
    setPostComments(
      postComments.filter(
        (comment) =>
          comment.commentId !== commentId &&
          comment.parentCommentId !== commentId,
      ),
    );
  };

  // 댓글 업데이트
  const updateComment = (commentId: number, updatedContent: string): void => {
    setPostComments((prevComments) =>
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
        {post && <CommunityPostDetail data={post} pageURL="community" />}
      </Container>
      <Container sx={{ padding: '20px 0', position: 'relative' }}>
        <CommentList
          comments={postComments} // 상태에서 가져온 댓글 목록을 전달
          route={`api/community/posts/${post?.communityId}`}
          postId={post?.communityId ? post.communityId.toString() : ''}
          idName="communityId"
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      </Container>
    </PostDetailWrapper>
  );
};

export default ViewPostDetail;
