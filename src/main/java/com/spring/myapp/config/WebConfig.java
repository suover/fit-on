package com.spring.myapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 웹 설정 클래스.
 *
 * 이 클래스는 CORS 설정을 구성합니다.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

	/**
	 * CORS 설정을 추가합니다.
	 *
	 * @param registry CorsRegistry 객체
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:3000", "https://fiton.kr")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
			.allowedHeaders("*")
			.allowCredentials(true);
	}
}
