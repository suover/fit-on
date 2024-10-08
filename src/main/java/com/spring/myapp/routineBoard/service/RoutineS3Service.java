package com.spring.myapp.routineBoard.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Service
public class RoutineS3Service {

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	public RoutineS3Service(AmazonS3 amazonS3) {
		this.amazonS3 = amazonS3;
	}

	public void uploadFile(String folder, String filename, MultipartFile file) throws IOException {
		String key = folder + "/" + filename;

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		metadata.setContentType(file.getContentType());

		amazonS3.putObject(bucketName, key, file.getInputStream(), metadata);
	}

	public String getFileUrl(String folder, String filename) {
		return amazonS3.getUrl(bucketName, folder + "/" + filename).toString();
	}
}
