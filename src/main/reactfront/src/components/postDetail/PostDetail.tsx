import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonLikePost from '../common/button/ButtonLikePost';
import ButtonShare from '../common/button/ButtonShare';
import { PostWrapper, BackBtn } from './PostDetail.styles';

import { Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';

import CommentList from '../common/comment/CommentList';
import { Comment } from '../../types/MainDummyData';

type DataType = {
  postId: number | string;
  category?: string;
  userId: string;
  title: string;
  content: string;
  createAt: string;
  comments: Comment[];
  views: number;
  likes: number;
};

interface PostDetailProps<T> {
  data: T;
  pageURL: string;
}

const PostDetail = <T extends DataType>({
  data,
  pageURL,
}: PostDetailProps<T>) => {
  const { title, userId, content, createAt, comments, category, views, likes } =
    data;
  const [contentData, setcontentData] = useState<T>(data); // 실제 데이터가 들어오면 이용
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setisShared] = useState(false);
  const navigete = useNavigate();

  const handleLikeClick = () => {
    if (data) {
      setIsLiked(!isLiked);
      setcontentData({
        ...data,
        likes: isLiked ? data.likes - 1 : data.likes + 1,
      });
    }
  };
  const handleShareClick = () => {
    if (data) {
      setisShared(!isShared);
    }
  };

  return (
    <>
      <PostWrapper>
        {category ? (
          <span>
            <ArrowForwardIosIcon />
            {category}
          </span>
        ) : (
          ''
        )}
        <h2>{title || '제목 없음'}</h2>
        <div className="postInfo">
          <span>
            <PersonIcon />
          </span>
          <span>{userId}</span>
          <span>{createAt}</span>
          <span>{`조회수: ${views || 0}`}</span>
        </div>
        <div className="content">{content || '내용 없음'}</div>
        {/* 좋아요, 북마크 */}
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
            likeNum={likes}
            onClick={handleLikeClick}
          />
          <ButtonShare isShared={isShared} onClick={handleShareClick} />
        </Box>
      </PostWrapper>
      <CommentList comments={comments} />
      <Box sx={{ display: 'flex' }}>
        <BackBtn
          style={{ marginLeft: 'auto' }}
          onClick={() => navigete(`/${pageURL}`)}
        >
          목록
        </BackBtn>
      </Box>
    </>
  );
};

export default PostDetail;
