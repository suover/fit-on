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

/**
 * JWT 인증 필터 클래스.
 * JWT 토큰을 검증하고 인증을 설정합니다.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	private final UserDetailsService userDetailsService;
	private final JwtTokenProvider jwtTokenProvider;

	/**
	 * JwtAuthenticationFilter 생성자.
	 *
	 * @param userDetailsService 사용자 상세 정보를 제공하는 서비스
	 * @param jwtTokenProvider JWT 토큰을 관리하는 제공자
	 */
	public JwtAuthenticationFilter(UserDetailsService userDetailsService, JwtTokenProvider jwtTokenProvider) {
		this.userDetailsService = userDetailsService;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	/**
	 * 요청에 대한 필터링을 수행합니다.
	 *
	 * @param request HTTP 요청
	 * @param response HTTP 응답
	 * @param filterChain 필터 체인
	 * @throws ServletException 서블릿 예외 발생 시
	 * @throws IOException 입출력 예외 발생 시
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {
		String jwt = jwtTokenProvider.getTokenFromRequest(request);

		if (jwt != null) {
			try {
				logger.debug("JWT token found");
				if (jwtTokenProvider.validateToken(jwt)) {
					logger.debug("JWT token is valid");

					String username = jwtTokenProvider.getUsernameFromToken(jwt);
					List<String> roles = jwtTokenProvider.getRolesFromToken(jwt);

					var userDetails = userDetailsService.loadUserByUsername(username);
					var authorities = roles.stream()
						.map(role -> new SimpleGrantedAuthority(role.toUpperCase()))
						.collect(Collectors.toList());

					var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

					SecurityContextHolder.getContext().setAuthentication(authentication);
					logger.debug("Authenticated user: {}, setting security context", username);
				} else {
					logger.debug("JWT token is invalid");
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
		} else {
			logger.debug("No JWT token found in request headers");
		}

		filterChain.doFilter(request, response);
	}
}
