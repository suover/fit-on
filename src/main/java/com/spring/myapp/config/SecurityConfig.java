package com.spring.myapp.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
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

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private Environment env;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		String[] excludedPaths = env.getProperty("spring.security.jwt.excluded-paths", "").split(",");
		String[] permitAllPaths = env.getProperty("spring.security.jwt.permit-all-paths", "").split(",");
		String[] authenticatedPaths = env.getProperty("spring.security.jwt.authenticated-paths", "").split(",");
		String[] adminPaths = env.getProperty("spring.security.jwt.admin-paths", "").split(",");

		http
			.csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
			.httpBasic(httpBasicConfigurer -> httpBasicConfigurer.disable()) // HTTP 기본 인증 비활성화
			.sessionManagement(sessionManagement -> sessionManagement
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 상태 비저장으로 설정
			)
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(permitAllPaths).permitAll()
				.requestMatchers(authenticatedPaths).authenticated()
				.requestMatchers(adminPaths).hasRole("ADMIN")
				.anyRequest().permitAll()
			)
			.formLogin(form -> form
				.loginPage("/sign-in")
				.defaultSuccessUrl("/", true)
				.permitAll()
			)
			.logout(logout -> logout
				.logoutUrl("/logout")
				.logoutSuccessUrl("/")
				.permitAll()
			)
			.addFilterBefore(
				new JwtAuthenticationFilter(userDetailsService, env.getProperty("spring.security.jwt.secret"),
					excludedPaths),
				UsernamePasswordAuthenticationFilter.class
			);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder =
			http.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
		return authenticationManagerBuilder.build();
	}
}
