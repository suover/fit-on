package com.spring.myapp.community.repository;

public class CommunityBoardUser {
		private Long userId;
		private String email;
		private String password;

		// Getters and setters

		public Long getUserId() {
				return userId;
		}

		public void setUserId(Long userId) {
				this.userId = userId;
		}

		public String getEmail() {
				return email;
		}

		public void setEmail(String email) {
				this.email = email;
		}

		public String getPassword() {
				return password;
		}

		public void setPassword(String password) {
				this.password = password;
		}
}
