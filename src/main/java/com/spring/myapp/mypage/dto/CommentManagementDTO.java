package com.spring.myapp.mypage.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * CommentManagementDTO는 댓글 관리를 위한 데이터 전송 객체입니다.
 */
@Getter
@Setter
public class CommentManagementDTO {
	private String id;
	private String postId;
	private String postTitle;
	private String content;
	private String date;
	private String parentId;
}
