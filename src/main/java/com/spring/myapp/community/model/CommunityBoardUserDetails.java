package com.spring.myapp.community.model;


import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CommunityBoardUserDetails implements UserDetails {
		private static final long serialVersionUID = 1L;

		private Long userId; // 사용자 ID
		private String username;
		private String password;
		private Collection<? extends GrantedAuthority> authorities;

		public CommunityBoardUserDetails(Long userId, String username, String password, Collection<? extends GrantedAuthority> authorities) {
				this.userId = userId;
				this.username = username;
				this.password = password;
				this.authorities = authorities;
		}

		public Long getUserId() {
				return userId;
		}

		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
				return authorities;
		}

		@Override
		public String getPassword() {
				return password;
		}

		@Override
		public String getUsername() {
				return username;
		}

		@Override
		public boolean isAccountNonExpired() {
				return true;
		}

		@Override
		public boolean isAccountNonLocked() {
				return true;
		}

		@Override
		public boolean isCredentialsNonExpired() {
				return true;
		}

		@Override
		public boolean isEnabled() {
				return true;
		}
}