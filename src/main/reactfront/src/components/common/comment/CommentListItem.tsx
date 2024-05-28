import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Comment } from './CommentList';
import StyledCommentItem from './StyledCommentItem';
import CommentInputField from './CommentInputField';

const CommentWrapper = styled.div`
  width: 100%;
`;

const ReplyWrapper = styled.div`
  padding-left: 60px;
`;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const CommentListItem: React.FC<{
  comment: Comment;
  route: string;
  postId: string;
  idName: string;
}> = ({ comment, route, postId, idName }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [countReplies, setCountReplies] = useState<number>();

  useEffect(() => {
    // 대댓글 불러오기
    const fetchComment = async () => {
      try {
        const res = await axiosInstance.get<Comment[]>(
          `${route}/${comment.commentId}`,
        );
        setReplies(res.data);
        setCountReplies(res.data.length);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchComment();
  }, []);

  useEffect(() => {
    // prop 'comment'가 변경될 때마다 실행
    setCountReplies(replies.length);
  }, [replies]);

  const addedReplies = (comment: Comment) => {
    setReplies([...replies, comment]);
    setCountReplies((prevCount) => (prevCount || 0) + 1);
  };

  const handleShowReply = (isShow: boolean): void => {
    setShowReplies((prevState) => !prevState);
  };

  return (
    <CommentWrapper>
      <StyledCommentItem
        comment={comment}
        isReply={false}
        cntReplies={countReplies}
        clickReply={handleShowReply}
      />
      {showReplies && (
        <ReplyWrapper>
          <CommentInputField
            route={route}
            postId={postId}
            idName={idName}
            commentId={comment.commentId}
            addComment={addedReplies}
          />
          {replies
            ? replies.map((eachreplies) => (
                <StyledCommentItem
                  key={eachreplies.commentId}
                  comment={eachreplies}
                  isReply={true}
                  clickReply={handleShowReply}
                />
              ))
            : ''}
        </ReplyWrapper>
      )}
    </CommentWrapper>
  );
};

export default CommentListItem;
