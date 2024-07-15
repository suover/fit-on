package com.spring.myapp.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.spring.myapp.security.JwtAuthenticationFilter;
import com.spring.myapp.security.JwtTokenProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private Environment env;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		String[] publicEndpoints = env.getProperty("spring.security.endpoints.public", String[].class);
		String adminEndpoint = env.getProperty("spring.security.endpoints.admin");
		String authenticatedEndpoint = env.getProperty("spring.security.endpoints.authenticated");

		http
			.csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
			.httpBasic(httpBasicConfigurer -> httpBasicConfigurer.disable()) // HTTP 기본 인증 비활성화
			.sessionManagement(sessionManagement -> sessionManagement
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 상태 비저장으로 설정
			)
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(publicEndpoints).permitAll() // 공용 엔드포인트 허용
				.requestMatchers(adminEndpoint).hasRole("ADMIN") // 관리자 경로 설정
				.requestMatchers(authenticatedEndpoint).authenticated() // 인증된 사용자만 접근
				.requestMatchers(HttpMethod.GET).permitAll() // 모든 GET 요청 허용
				.anyRequest().authenticated() // 나머지 모든 요청 인증 필요
			)
			.addFilterBefore(
				new JwtAuthenticationFilter(userDetailsService, jwtTokenProvider),
				UsernamePasswordAuthenticationFilter.class
			);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder =
			http.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.parentAuthenticationManager(null);
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
		return authenticationManagerBuilder.build();
	}
}
