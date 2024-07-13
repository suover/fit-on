package com.spring.myapp.informationBoard.model;

import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoPaging<T> {
	private T infoData;

	private Pageable pageable;
}
