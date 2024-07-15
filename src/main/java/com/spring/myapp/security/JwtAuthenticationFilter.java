package com.spring.myapp.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	private final UserDetailsService userDetailsService;
	private final JwtTokenProvider jwtTokenProvider;

	public JwtAuthenticationFilter(UserDetailsService userDetailsService, JwtTokenProvider jwtTokenProvider) {
		this.userDetailsService = userDetailsService;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {
		String jwt = jwtTokenProvider.getTokenFromRequest(request);

		if (jwt != null) {
			try {
				if (jwtTokenProvider.validateToken(jwt)) {
					String username = jwtTokenProvider.getUsernameFromToken(jwt);
					List<String> roles = jwtTokenProvider.getRolesFromToken(jwt);

					var userDetails = userDetailsService.loadUserByUsername(username);
					var authorities = roles.stream()
						.map(role -> new SimpleGrantedAuthority(role.toUpperCase()))
						.collect(Collectors.toList());

					var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			} catch (ExpiredJwtException e) {
				logger.error("Token expired", e);
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return;
			} catch (Exception e) {
				logger.error("Token validation error", e);
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return;
			}
		}

		filterChain.doFilter(request, response);
	}
}
