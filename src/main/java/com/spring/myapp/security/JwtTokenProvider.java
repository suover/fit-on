package com.spring.myapp.security;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;

/**
 * JWT 토큰 제공자 클래스.
 * JWT 토큰의 생성, 검증 및 파싱을 처리합니다.
 */
@Component
public class JwtTokenProvider {

	private final SecretKey secretKey;

	@Getter
	private final long accessTokenExpiration;

	@Getter
	private final long refreshTokenExpiration;

	/**
	 * JwtTokenProvider 생성자.
	 *
	 * @param base64Secret Base64로 인코딩된 비밀 키
	 * @param accessTokenExpiration 액세스 토큰 만료 시간
	 * @param refreshTokenExpiration 리프레시 토큰 만료 시간
	 */
	public JwtTokenProvider(@Value("${spring.security.jwt.secret}") String base64Secret,
		@Value("${spring.security.jwt.access-expiration}") long accessTokenExpiration,
		@Value("${spring.security.jwt.refresh-expiration}") long refreshTokenExpiration) {
		this.secretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(base64Secret));
		this.accessTokenExpiration = accessTokenExpiration;
		this.refreshTokenExpiration = refreshTokenExpiration;
	}

	/**
	 * 액세스 토큰을 생성합니다.
	 *
	 * @param username 사용자 식별자 (이메일 주소)
	 * @param roles 사용자 역할 목록
	 * @param nickname 사용자 닉네임
	 * @param userId 사용자 ID
	 * @param name 사용자 이름
	 * @return 생성된 액세스 토큰
	 */
	public String createAccessToken(String username, List<String> roles, String nickname, Long userId, String name) {
		return createToken(username, roles, nickname, userId, name, accessTokenExpiration);
	}

	/**
	 * 리프레시 토큰을 생성합니다.
	 *
	 * @param username 사용자 식별자 (이메일 주소)
	 * @return 생성된 리프레시 토큰
	 */
	public String createRefreshToken(String username) {
		return createToken(username, null, null, null, null, refreshTokenExpiration);
	}

	/**
	 * JWT 토큰을 생성합니다.
	 *
	 * @param username 사용자 식별자 (이메일 주소)
	 * @param roles 사용자 역할 목록
	 * @param nickname 사용자 닉네임
	 * @param userId 사용자 ID
	 * @param name 사용자 이름
	 * @param expiration 토큰 만료 시간
	 * @return 생성된 JWT 토큰
	 */
	private String createToken(String username, List<String> roles, String nickname, Long userId, String name,
		long expiration) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + expiration);

		Claims claims = Jwts.claims().setSubject(username);
		if (roles != null) {
			claims.put("roles", roles);
		}
		if (nickname != null) {
			claims.put("nickname", nickname);
		}
		if (userId != null) {
			claims.put("userId", userId);
		}
		if (name != null) {
			claims.put("name", name);
		}

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(expiryDate)
			.signWith(secretKey, SignatureAlgorithm.HS256)
			.compact();
	}

	/**
	 * 토큰에서 사용자 식별자 (이메일 주소)를 가져옵니다.
	 *
	 * @param token JWT 토큰
	 * @return 사용자 식별자 (이메일 주소)
	 */
	public String getUsernameFromToken(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody()
			.getSubject();
	}

	/**
	 * 토큰에서 역할 목록을 가져옵니다.
	 *
	 * @param token JWT 토큰
	 * @return 역할 목록
	 */
	public List<String> getRolesFromToken(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
		return claims.get("roles", List.class);
	}

	/**
	 * 토큰을 검증합니다.
	 *
	 * @param token JWT 토큰
	 * @return 토큰이 유효한지 여부
	 */
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
			return true;
		} catch (ExpiredJwtException e) {
			throw e;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 요청에서 JWT 토큰을 가져옵니다.
	 *
	 * @param request HTTP 요청
	 * @return JWT 토큰 또는 null
	 */
	public String getTokenFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
