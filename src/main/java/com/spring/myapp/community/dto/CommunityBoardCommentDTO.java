package com.spring.myapp.community.dto;


import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class CommunityBoardCommentDTO {
		private Long commentId;
		private Long communityId;      // 게시글 ID
		private Long userId;       // 댓글 작성자 ID
		private String content;    // 댓글 내용
		private Long parentCommentId;
		private Timestamp createdAt;
		private Timestamp updatedAt;
		private Boolean isDeleted; // 댓글 삭제 여부
		private String nickname;   // 댓글 작성자 닉네임
}
