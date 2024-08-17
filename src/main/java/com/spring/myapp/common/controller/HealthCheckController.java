package com.spring.myapp.common.controller;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 서버의 상태를 확인하기 위한 HealthCheckController 클래스입니다.
 * 이 클래스는 서버의 현재 환경 및 설정된 정보를 반환하는 API를 제공합니다.
 */
@RestController
@Tag(name = "Health Check Controller", description = "서버 상태 확인을 위한 API")
public class HealthCheckController {

	@Value("${server.env}")
	private String env;

	@Value("${server.port}")
	private String serverPort;

	@Value("${server.serverAddress}")
	private String serverAddress;

	@Value("${serverName}")
	private String serverName;

	/**
	 * 서버의 상태를 확인하는 API입니다.
	 *
	 * @return 서버의 상태 정보
	 */
	@Operation(summary = "서버 상태 확인", description = "서버의 현재 상태 및 환경 정보를 반환합니다.")
	@GetMapping("/hc")
	public ResponseEntity<?> healthCheck() {
		Map<String, String> responseData = new TreeMap<>();
		responseData.put("serverName", serverName);
		responseData.put("serverAddress", serverAddress);
		responseData.put("serverPort", serverPort);
		responseData.put("env", env);
		return ResponseEntity.ok(responseData);
	}

	/**
	 * 서버의 현재 환경(env)을 반환하는 API입니다.
	 *
	 * @return 현재 환경(env) 정보
	 */
	@Operation(summary = "현재 환경 확인", description = "서버의 현재 환경(env) 정보를 반환합니다.")
	@GetMapping("/env")
	public ResponseEntity<?> getEnv() {
		return ResponseEntity.ok(env);
	}
}
