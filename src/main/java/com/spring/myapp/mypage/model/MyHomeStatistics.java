package com.spring.myapp.mypage.model;

import lombok.Getter;
import lombok.Setter;

/**
 * MyHomeStatistics는 사용자의 글 작성 수, 댓글 수, 좋아요 수를 나타내는 모델 클래스입니다.
 */
@Getter
@Setter
public class MyHomeStatistics {
	private int communityPostCount;
	private int communityCommentCount;
	private int communityLikeCount;
	private int routinePostCount;
	private int routineCommentCount;
	private int routineLikeCount;
	private int infoPostCount;
	private int infoCommentCount;
	private int infoLikeCount;
}
