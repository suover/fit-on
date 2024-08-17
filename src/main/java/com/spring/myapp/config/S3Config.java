package com.spring.myapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

/**
 * AWS S3 설정 클래스.
 * 이 클래스는 제공된 AWS 자격 증명으로 AmazonS3Client의 빈을 생성합니다.
 */
@Configuration
public class S3Config {

	@Value("${cloud.aws.credentials.access-key}")
	private String accessKey;

	@Value("${cloud.aws.credentials.secret-key}")
	private String secretKey;

	@Value("${cloud.aws.region.static}")
	private String region;

	/**
	 * AmazonS3Client 빈을 생성합니다.
	 *
	 * @return AmazonS3Client 객체
	 */
	@Bean
	public AmazonS3Client amazonS3Client() {

		BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);

		return (AmazonS3Client)AmazonS3ClientBuilder
			.standard()
			.withRegion(region)
			.withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
			.build();
	}
}
