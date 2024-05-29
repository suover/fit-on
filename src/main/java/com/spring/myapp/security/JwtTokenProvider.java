package com.spring.myapp.security;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

	private final SecretKey secretKey;
	private final long expiration;

	public JwtTokenProvider(@Value("${spring.security.jwt.secret}") String base64Secret,
		@Value("${spring.security.jwt.expiration}") long expiration) {
		byte[] decodedKey = Base64.getDecoder().decode(base64Secret);
		this.secretKey = Keys.hmacShaKeyFor(decodedKey);
		this.expiration = expiration;
	}

	public String createToken(String username, List<String> roles, String nickname, Long userId, String name) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + expiration);

		return Jwts.builder()
			.setSubject(username)
			.claim("roles", roles)
			.claim("nickname", nickname)
			.claim("user_id", userId)
			.claim("name", name)
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
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody();

		return claims.get("roles", List.class);
	}

	public String getNicknameFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody();
		return claims.get("nickname", String.class);
	}

	public Long getUserIdFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody();
		return claims.get("user_id", Long.class);
	}

	public String getNameFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody();
		return claims.get("name", String.class);
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
