import React, { useState, useEffect } from 'react';
import { Product, ProductImage } from '../../types/DataInterface';
import {
  Image,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Search } from '../../styles/administrator/ItemListPage.styles';
import SearchBox from '../../components/common/search/SearchBox';
import { useNavigate } from 'react-router-dom';
import GenericButton from '../../components/common/genericButton/GenericButton';
import DeleteIcon from '../../components/icons/DeleteIcon';
import axios from 'axios';

const categoryMap: { [key: number]: string } = {
  1: '피트니스',
  2: '보충제',
  3: '영양제',
  4: '식품',
  5: '요가 & 필라테스',
  6: '구기용품',
  7: '러닝 & 자전거용품',
  8: '복싱 & 잡화',
};

const ItemListPage: React.FC = () => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // const [productImgs, setProductImgs] = useState<ProductImage[]>([]);

  const navigate = useNavigate();

  //상품 정보들 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      //       await fetchProductImages();
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        'http://localhost:8080/api/products',
      );
      setProducts(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  // const fetchProductImages = async () => {
  //   try {
  //     const imageResponse = await axios.get<ProductImage[]>(
  //       'http://localhost:8080/api/products-images',
  //     );
  //     setProductImgs(imageResponse.data);
  //   } catch (error) {
  //     console.error('Failed to fetch product images:', error);
  //   }
  // };

  const handleDeleteClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      try {
        await axios.patch(
          `http://localhost:8080/api/products/${selectedProductId}/deactive`,
          {
            isDeleted: true,
          },
        );

        await fetchProducts();
      } catch (error) {
        console.error('Failed to deactivate product:', error);
      }
    }
    setIsDeleteConfirmationOpen(false);
    setSelectedProductId(null);
  };

  const handleSearch = (query: string) => {
    const filtered = products.filter(
      (product) =>
        product.id.includes(query) ||
        product.name.includes(query) ||
        //         product.category.includes(query) ||
        //         product.price.includes(query) ||
        //         product.sales.toString().includes(query) ||
        product.stock.toString().includes(query),
    );
    setFilteredItems(filtered);
  };

  const columns = [
    { id: 'id', label: '번호', width: 5 },
    { id: 'name', label: '이름', width: 25 },
    { id: 'price', label: '가격', width: 10 },
    { id: 'sales', label: '판매량', width: 10 },
    { id: 'stock', label: '재고', width: 10 },
    { id: 'category', label: '카테고리', width: 10 },
    { id: 'status', label: '상태', width: 10 },
    { id: 'delete', label: '삭제', width: 10 },
  ];

  return (
    <Box sx={{ minHeight: '600px' }}>
      <Search>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Fit On 상품목록
        </Typography>
        <SearchBox onSearch={handleSearch} />
      </Search>

      <GenericTable
        columns={columns}
        data={filteredItems}
        renderRow={(product: Product) => (
          <TableRow key={product.productId}>
            <TableData>{product.productId}</TableData>
            <TableData>{product.name}</TableData>
            <TableData>{product.price}원</TableData>
            <TableData>판매량??</TableData>
            <TableData>{product.stock}</TableData>
            {/* <TableData>{product.categoryId}</TableData> */}
            <TableData>
              {categoryMap[product.categoryId] || '알 수 없음'}
            </TableData>
            <TableData>{product.isDeleted ? '비 활성화' : '활성화'}</TableData>
            <TableData>
              <div
                onClick={() => handleDeleteClick(product.productId)}
                style={{ cursor: 'pointer' }}
              >
                <DeleteIcon />
              </div>
            </TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
      <Box sx={{ position: 'relative' }}>
        <GenericButton
          onClick={() => navigate('/administrator/item-register')}
          style={{ position: 'absolute', right: '0', top: '-35px' }}
        >
          아이템 등록
        </GenericButton>
      </Box>
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'메시지'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말로 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ItemListPage;
