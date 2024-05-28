import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom'; // 뭔지 모르겠음

import styled from 'styled-components';

import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import SearchBox from '../../components/common/search/SearchBox';
import SidebarWrapper from '../../components/common/sidebar/SidebarWrapper';
import { Container } from '@mui/material';
import { Product } from '../../types/DataInterface';
import ProductCardList from './ProductCardList';
import axios from 'axios';
// import { productData, Product } from '../../types/ProductData'; // 더미데이터

export const Search = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
  & input,
  & button {
    box-sizing: border-box;
  }
`;

const Mall: React.FC = () => {
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // 장바구니만 route로 적용시키고, 나머지는 카테고리 필터링으로 변경
  const menuItems = [
    { route: '/mall', menuName: '쇼핑몰', icon: HomeIcon },
    {
      route: 'fitness',
      menuName: '운동용품',
      icon: FitnessCenterIcon,
    },
    {
      route: 'supplement',
      menuName: '보충제',
      icon: LocalPharmacyIcon,
    },
    { route: 'food', menuName: '식품', icon: RestaurantIcon },
    {
      route: '/shopping-basket',
      menuName: '장바구니',
      icon: ShoppingCartIcon,
      badge: 3,
    },
  ];

  //상품 정보 세팅
  useEffect(() => {
    fetchProducts();
  }, []);

  //상품 정보 가져오기
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        'http://localhost:8080/api/products/with-images/active',
      );
      setProducts(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
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

  return (
    <>
      <Container sx={{ paddingTop: '50px', paddingBottom: '100px' }}>
        <SidebarWrapper>
          <SideNavbar
            menuItems={menuItems}
            drawerWidthOpen="200px"
            title="FitOn Mall"
          />
        </SidebarWrapper>

        <Search>
          <SearchBox onSearch={handleSearch} />
        </Search>
        <ProductCardList products={filteredItems} />

        {/* <Outlet /> */}
      </Container>
    </>
  );
};

export default Mall;
