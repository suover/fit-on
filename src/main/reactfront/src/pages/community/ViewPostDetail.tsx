import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommunityPostDetail from '../../components/community/CommunityPostDetail';

interface Post {
  communityId: number;
  userId: number;
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

  useEffect(() => {
    if (postId) {
      console.log(`Fetching post with id: ${postId}`);

      const fetchPost = async () => {
        try {
          const response = await axios.get<Post>(
            `http://localhost:8080/api/community/posts/${postId}`,
          );
          setPost(response.data);
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    } else {
      setLoading(false); // postId가 없을 경우 로딩 종료
    }
  }, [postId]);

  // 로딩 중일 때
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

  // 데이터가 없는 경우 (에러 처리 등)
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
    <Container
      maxWidth="lg"
      sx={{ minHeight: '700px', padding: '50px 0 100px' }}
    >
      {post && (
        <CommunityPostDetail
          data={{ ...post, postId: post.communityId }}
          pageURL="community"
        />
      )}
    </Container>
  );
};

export default ViewPostDetail;
