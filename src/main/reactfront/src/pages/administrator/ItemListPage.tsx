import React, { useState, useEffect } from 'react';
// import { Product } from '../../types/administrator/ItemsData';
// import { Product, products } from '../../types/administrator/ItemsData';
import { Product } from '../../types/DataInterface';
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

const ItemListPage: React.FC = () => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();
  //   const [filteredItems, setFilteredItems] = useState<Product[]>(products);

  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  //상품 리스트 가져오기
  useEffect(() => {
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

    fetchProducts();
  }, []);

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedProductId(null);
  };

  //   const handleConfirmDelete = () => {
  //     if (selectedProductId) {
  //       setFilteredItems((prevItems) =>
  //         prevItems.filter((product) => product.id !== selectedProductId),
  //       );
  //     }
  //     setIsDeleteConfirmationOpen(false);
  //     setSelectedProductId(null);
  //   };
  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      try {
        // 백엔드에서 isDeleted 속성을 true로 설정
        await axios.put(
          `http://localhost:8080/api/products/${selectedProductId}`,
          {
            isDeleted: true,
          },
        );

        // 로컬 상태 업데이트
        setFilteredItems((prevItems) =>
          prevItems.map((product) =>
            product.productId === selectedProductId
              ? { ...product, isDeleted: true }
              : product,
          ),
        );
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === selectedProductId
              ? { ...product, isDeleted: true }
              : product,
          ),
        );
      } catch (error) {
        console.error('Failed to update product:', error);
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
    <>
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
            <TableData>{product.categoryId}</TableData>
            <TableData>{product.isDeleted ? '비 활성화' : '활성화'}</TableData>
            <TableData>
              <div
                onClick={() => handleDeleteClick(product.id)}
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
          onClick={() => navigate('/item-register')}
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
    </>
  );
};

export default ItemListPage;

//<Image $backgroundImage={product.imageUrl} />
