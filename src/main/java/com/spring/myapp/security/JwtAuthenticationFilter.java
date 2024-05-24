package com.spring.myapp.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final UserDetailsService userDetailsService;
	private final SecretKey secretKey;
	private final List<String> excludedPaths;

	public JwtAuthenticationFilter(UserDetailsService userDetailsService,
		@Value("${security.jwt.secret}") String base64Secret,
		String[] excludedPaths) {
		this.userDetailsService = userDetailsService;
		byte[] decodedKey = Base64.getDecoder().decode(base64Secret);
		this.secretKey = Keys.hmacShaKeyFor(decodedKey);
		this.excludedPaths = Arrays.asList(excludedPaths);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {
		String requestURI = request.getRequestURI();

		if (excludedPaths.contains(requestURI)) {
			filterChain.doFilter(request, response);
			return;
		}

		String jwt = extractJwtFromRequest(request);

		if (jwt != null && validateToken(jwt)) {
			String username = getUsernameFromJWT(jwt);

			var userDetails = userDetailsService.loadUserByUsername(username);

			var authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
				userDetails.getAuthorities());

			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}

	private String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

	private boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private String getUsernameFromJWT(String token) {
		var claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
		return claims.getSubject();
	}
}
