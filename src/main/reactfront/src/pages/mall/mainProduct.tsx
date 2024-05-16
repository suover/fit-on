import React, { useState } from 'react';
import styled from 'styled-components';
import CardComponent from '../../components/productCard/CardComponent';
import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { productData, Product } from '../../types/productData';
import SearchBox from '../../components/common/search/SearchBox';

const CenteredContainer = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  }
`;
const MallContainer = styled.div`
  display: flex;
  height: 100%;
  padding-left: 100px;
  margin-top: 20px;
`;
export const Search = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
  margin-right: 295px;
  & input,
  & button {
    box-sizing: border-box;
  }
`;

const MainProduct: React.FC = () => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productData);

  const menuItems = [
    { route: '/mainProduct', menuName: '쇼핑몰', icon: HomeIcon },
    {
      route: '/fitness',
      menuName: '운동용품',
      icon: FitnessCenterIcon,
    },
    {
      route: '/supplement',
      menuName: '보충제',
      icon: LocalPharmacyIcon,
    },
    { route: '/food', menuName: '식품', icon: RestaurantIcon },
    { route: '/cart', menuName: '장바구니', icon: ShoppingCartIcon, badge: 3 },
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
      <MallContainer>
        <SideNavbar
          menuItems={menuItems}
          drawerWidthOpen="240px"
          title="FitOn Mall"
        />
        <CenteredContainer>
          <Search>
            <SearchBox
              onSearch={handleSearch}
              styleProps={{ width: '220px' }}
            />
          </Search>
          <CardComponent product={filteredProducts} />
        </CenteredContainer>
      </MallContainer>
    </>
  );
};

export default MainProduct;
