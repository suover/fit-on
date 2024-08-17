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
public class CommunityBoardDTO {
		private Long communityId;
		private Long userId;
		private Long categoryId;
		private String title;
		private String content;
		private Timestamp createdAt;
		private Timestamp updatedAt;
		private Boolean isDeleted;
		private int viewCount;
		private String nickname;
		private String categoryName;
		private int likes;
}
