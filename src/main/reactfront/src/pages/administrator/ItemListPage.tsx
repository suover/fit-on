import React, { useState, useEffect } from 'react';
// import { Product } from '../../types/administrator/ItemsData';
// import { Product, products } from '../../types/administrator/ItemsData';
import {Product} from '../../types/DataInterface'
import {
  Container,
  Image,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import { Typography } from '@mui/material';
import { Info, Search } from '../../styles/administrator/ItemListPage.styles';
import SearchBox from '../../components/common/search/SearchBox';
import { useNavigate } from 'react-router-dom';
import GenericButton from '../../components/common/genericButton/GenericButton';
import axios from 'axios';


const ItemListPage: React.FC = () => {
  const navigate = useNavigate();
//   const [filteredItems, setFilteredItems] = useState<Product[]>(products);

  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  //상품 리스트 가져오기
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get<Product[]>('http://localhost:8080/api/products');
          setProducts(response.data);
          setFilteredItems(response.data);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        }
      };

      fetchProducts();
    }, []);

  const handleSearch = (query: string) => {
    const filtered = products.filter(
      (product) =>
        product.id.includes(query) ||
        product.name.includes(query) ||
        product.category.includes(query) ||
        product.price.includes(query) ||
        product.sales.toString().includes(query) ||
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
  ];
  return (
    <>
      <Info>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Fit On 상품목록
        </Typography>
        <GenericButton
          style={{ marginBottom: '10px' }}
          onClick={() => navigate('/item-register')}
        >
          상품 등록
        </GenericButton>
      </Info>
      <Search>
        <SearchBox onSearch={handleSearch} />
      </Search>
      <GenericTable
        columns={columns}
        data={filteredItems}
        renderRow={(product: Product) => (
          <TableRow key={product.productId}>
            <TableData>{product.productId}</TableData>
            <TableData>
              <Image $backgroundImage={product.imageUrl} />
              {product.name}
            </TableData>
            <TableData>{product.price}원</TableData>
            <TableData>{product.sales}</TableData>
            <TableData>{product.stock}</TableData>
            <TableData>{product.categoryId}</TableData>
            <TableData>{product.isDeleted}</TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
    </>
  );
};

export default ItemListPage;
