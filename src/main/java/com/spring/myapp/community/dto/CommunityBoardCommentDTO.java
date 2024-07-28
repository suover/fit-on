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
		private Long communityId;
		private Long userId;
		private String content;
		private Long parentCommentId;
		private Timestamp createdAt;
		private Timestamp updatedAt;
		private Boolean isDeleted;
		private String nickname;
}
