import React, {useState, useEffect} from 'react';
import {Box, CircularProgress, Pagination, Typography} from '@mui/material';
import { Product,ProductPage } from '../../types/DataInterface';
import ProductCardList from './ProductCardList';
import axios from '../../api/axiosConfig';

const Fittness: React.FC = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [categoryValue, setCategoryValue] = useState<number>(1);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [totalPages, setTotalPages] = useState<number>(0);

  // 상품 정보 세팅
  useEffect(() => {
    fetchCategoryProducts(page - 1, pageSize); // page - 1로 수정
  }, [page]);


  // 상품 정보 가져오기
  const fetchCategoryProducts = async (page: number, pageSize: number) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.get<ProductPage<Product>>(
          `/api/products/${categoryValue}/active?page=${page}&size=${pageSize}`,
      );
      setFilteredItems(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
      <>
        <Box sx={{paddingTop: '50px'}}></Box>
        <Box sx={{ maxWidth: '1200px', width: '100%' }}>
          {loading ? ( // 로딩 상태일 때 로딩 아이콘 표시
              <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h6">상품 목록을 불러오는 중입니다.</Typography>
                <Box display="flex" justifyContent="center" ml={2}> <CircularProgress /> </Box>
              </Box>
          ) : filteredItems.length === 0 ? ( // 상품이 없을 때 메시지 표시
              <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h6">상품이 없습니다.</Typography>
              </Box>
          ) : (
              <>
                <ProductCardList products={filteredItems} />
                <Box display="flex" justifyContent="center" mt={4}>
                  <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                  />
                </Box>
              </>
          )}
        </Box>
      </>
  );
};

export default Fittness;
