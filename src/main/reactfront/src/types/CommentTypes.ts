export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentCommentId?: number;
  replies?: Comment[];
  isDeleted: boolean; //  기본값 설정
  nickname: string;
  comments?: Comment[]; // nested comments 지원
}
