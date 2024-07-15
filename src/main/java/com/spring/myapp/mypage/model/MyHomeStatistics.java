package com.spring.myapp.mypage.model;

/**
 * MyHomeStatistics는 사용자의 글 작성 수, 댓글 수, 좋아요 수를 나타내는 모델 클래스입니다.
 */
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

	public int getCommunityPostCount() {
		return communityPostCount;
	}

	public void setCommunityPostCount(int communityPostCount) {
		this.communityPostCount = communityPostCount;
	}

	public int getCommunityCommentCount() {
		return communityCommentCount;
	}

	public void setCommunityCommentCount(int communityCommentCount) {
		this.communityCommentCount = communityCommentCount;
	}

	public int getCommunityLikeCount() {
		return communityLikeCount;
	}

	public void setCommunityLikeCount(int communityLikeCount) {
		this.communityLikeCount = communityLikeCount;
	}

	public int getRoutinePostCount() {
		return routinePostCount;
	}

	public void setRoutinePostCount(int routinePostCount) {
		this.routinePostCount = routinePostCount;
	}

	public int getRoutineCommentCount() {
		return routineCommentCount;
	}

	public void setRoutineCommentCount(int routineCommentCount) {
		this.routineCommentCount = routineCommentCount;
	}

	public int getRoutineLikeCount() {
		return routineLikeCount;
	}

	public void setRoutineLikeCount(int routineLikeCount) {
		this.routineLikeCount = routineLikeCount;
	}

	public int getInfoPostCount() {
		return infoPostCount;
	}

	public void setInfoPostCount(int infoPostCount) {
		this.infoPostCount = infoPostCount;
	}

	public int getInfoCommentCount() {
		return infoCommentCount;
	}

	public void setInfoCommentCount(int infoCommentCount) {
		this.infoCommentCount = infoCommentCount;
	}

	public int getInfoLikeCount() {
		return infoLikeCount;
	}

	public void setInfoLikeCount(int infoLikeCount) {
		this.infoLikeCount = infoLikeCount;
	}
}
