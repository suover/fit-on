package com.spring.myapp.product.service;

import com.spring.myapp.product.repository.ProductMapper;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.product.model.ProductImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

	@Autowired
	private ProductMapper productMapper;

	public List<Product> getAllProducts() {
		System.out.println( "서비스단 상품리스트 출력"+productMapper.findAll());
		return productMapper.findAll();
	}

	public Product getProductById(Long id) {
		return productMapper.findById(id);
	}

	public void saveProduct(Product product) {
		System.out.println("서비스단 saveProduct 실행");
		System.out.println("상품 등록 출력 : " + product);
		System.out.println("서비스 단 : 매퍼 실행");
		productMapper.save(product);
		// productMapper.saveImage();
		System.out.println("서비스 단 : 매퍼 실행 종료");
	}

	public void updateProduct(Product product) {
		productMapper.update(product);
	}

	public void deleteProduct(Long id) {
		productMapper.deleteById(id);
	}


	//상품 이미지 저장
	public void saveProductImage(ProductImage productImage) {
		productMapper.saveImage(productImage);
	}
	// 상품이미지들 불러오기
	public List<ProductImage> getAllProductImages(Long id) {
		System.out.println( "서비스단 상품리스트 출력"+productMapper.findAll());
		return productMapper.findProductImages(id);
	}
}
