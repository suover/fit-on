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

@Component
public class JwtTokenProvider {

	private final SecretKey secretKey;

	@Getter
	private final long accessTokenExpiration;

	@Getter
	private final long refreshTokenExpiration;

	public JwtTokenProvider(@Value("${spring.security.jwt.secret}") String base64Secret,
		@Value("${spring.security.jwt.access-expiration}") long accessTokenExpiration,
		@Value("${spring.security.jwt.refresh-expiration}") long refreshTokenExpiration) {
		this.secretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(base64Secret));
		this.accessTokenExpiration = accessTokenExpiration;
		this.refreshTokenExpiration = refreshTokenExpiration;
	}

	public String createAccessToken(String username, List<String> roles, String nickname, Long userId, String name) {
		return createToken(username, roles, nickname, userId, name, accessTokenExpiration);
	}

	public String createRefreshToken(String username) {
		return createToken(username, null, null, null, null, refreshTokenExpiration);
	}

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
			claims.put("user_id", userId);
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

	public String getUsernameFromToken(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody()
			.getSubject();
	}

	public List<String> getRolesFromToken(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
		return claims.get("roles", List.class);
	}

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

	public String getTokenFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
