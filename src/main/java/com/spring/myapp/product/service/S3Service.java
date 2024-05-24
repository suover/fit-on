package com.spring.myapp.product.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class S3Service {

	@Autowired
	private AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	@Autowired
	public S3Service(AmazonS3 amazonS3) {
		this.amazonS3 = amazonS3;
	}

	public String uploadFile(MultipartFile file, String folder) throws IOException{
		String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		String filePath = folder + "/" + fileName;

		File tempFile = Files.createTempFile("temp-", file.getOriginalFilename()).toFile();
		file.transferTo(tempFile);

		// S3 버킷에 업로드
		amazonS3.putObject(new PutObjectRequest(bucket, filePath, tempFile));

		tempFile.delete();

		return amazonS3.getUrl(bucket, filePath).toString();
	}
}