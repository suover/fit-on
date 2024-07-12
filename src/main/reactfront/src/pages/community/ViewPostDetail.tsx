import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommunityPostDetail from '../../components/community/CommunityPostDetail';
import { PostDetailWrapper } from '../../styles/community/CommunityDetail.styles';
import axiosInstance from '../../types/AxiosInstance';
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
  const { postId } = useParams<{ postId: string }>(); // URL 파라미터에서 postId 가져오기
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  // // 댓글 목록 불러오기
  // const fetchComments = async (communityId: number) => {
  //   try {
  //     const response = await axiosInstance.get<Comment[]>(
  //       `/api/community/posts/${communityId}/comments`,
  //     );
  //     setPostComments(response.data);
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //   }
  // };

  const fetchComments = async (communityId: number) => {
    try {
      const response = await axiosInstance.get<Comment[]>(
        `/api/community/posts/${communityId}/comments`,
      );
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get<Post>(
            `/api/community/posts/${postId}`,
          );
          console.log('#####Fetched post:', response.data); // API 응답 데이터 확인@@
          setPost(response.data);
          await fetchComments(response.data.communityId);
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
        {post && (
          <CommunityPostDetail
            data={{ ...post, comments }}
            pageURL="community"
          />
        )}
      </Container>
    </PostDetailWrapper>
  );
};

export default ViewPostDetail;
