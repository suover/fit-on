package com.spring.myapp.security;

import java.util.ArrayList;
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

	public String createToken(String username, List<String> roles, String nickname) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + expiration);

		return Jwts.builder()
			.setSubject(username)
			.claim("roles", roles)
			.claim("nickname", nickname)
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

		Object roles = claims.get("roles");
		if (roles instanceof List<?>) {
			List<?> rolesList = (List<?>)roles;
			List<String> rolesStringList = new ArrayList<>();
			for (Object role : rolesList) {
				if (role instanceof String) {
					rolesStringList.add((String)role);
				}
			}
			return rolesStringList;
		}
		return new ArrayList<>();
	}

	public String getNicknameFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(secretKey)
			.build()
			.parseClaimsJws(token)
			.getBody();
		return claims.get("nickname", String.class);
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
