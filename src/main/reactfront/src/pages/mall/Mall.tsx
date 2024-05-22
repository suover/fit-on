import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { productData, Product } from '../../types/ProductData';
import SearchBox from '../../components/common/search/SearchBox';
import SidebarWrapper from '../../components/common/sidebar/SidebarWrapper';
import { Container } from '@mui/material';

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
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productData);

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
    { route: 'cart', menuName: '장바구니', icon: ShoppingCartIcon, badge: 3 },
  ];

  const handleSearch = (query: string) => {
    const filtered = productData.filter(
      (product) =>
        product.category.includes(query) || product.name.includes(query),
    );
    setFilteredProducts(filtered);
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
        <Outlet />
      </Container>
    </>
  );
};

export default Mall;
