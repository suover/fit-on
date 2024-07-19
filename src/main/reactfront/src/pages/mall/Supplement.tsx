import React, { useState, useEffect } from 'react';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import { Product } from '../../types/DataInterface';
import ProductCardList from './ProductCardList';
import axios from '../../api/axiosConfig';

const Supplement: React.FC = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [categoryValue, setCategoryValue] = useState<number>(2);

  //상품 정보 세팅
  useEffect(() => {
    console.log('보충제몰 페이지 이동:');
    fetchCategoryProducts();
  }, []);

  //상품 정보 가져오기
  const fetchCategoryProducts = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.get<Product[]>(
          `/api/products/${categoryValue}/active`,
      );
      setFilteredItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <>
      <Container sx={{ paddingTop: '50px', paddingBottom: '100px' }}>
        <Box>
          {loading ? ( // 로딩 상태일 때 로딩 아이콘 표시
              <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h6">상품 목록을 불러오는 중입니다.</Typography>
                <Box display="flex" justifyContent="center" ml={2}> <CircularProgress /> </Box>
              </Box>
          ) : filteredItems.length === 0 ? ( // 상품이 없을 때 메시지 표시
              <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h6">표시할 상품이 없습니다.</Typography>
              </Box>
          ) : ( // 상품이 있을 때 목록 표시
              <ProductCardList products={filteredItems} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Supplement;
