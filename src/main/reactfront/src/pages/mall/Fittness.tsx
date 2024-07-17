import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import SearchBox from '../../components/common/search/SearchBox';
import SidebarWrapper from '../../components/common/sidebar/SidebarWrapper';
import {Box, Container, Pagination} from '@mui/material';
import { Product } from '../../types/DataInterface';
import ProductCardList from './ProductCardList';
import axios from '../../api/axiosConfig';
import AuthContext from "../../context/AuthContext";

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

const Fittness: React.FC = () => {
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [categoryValue, setCategoryValue] = useState<number>(1);

  const menuItems = [
    { route: '/mall', menuName: '쇼핑몰', icon: HomeIcon },
    {
      route: '/mall/fitness',
      menuName: '운동용품',
      icon: FitnessCenterIcon,
    },
    {
      route: '/mall/supplement',
      menuName: '보충제',
      icon: LocalPharmacyIcon,
    },
    { route: '/mall/food', menuName: '식품', icon: RestaurantIcon },
    {
      route: '/shopping-basket',
      menuName: '장바구니',
      icon: ShoppingCartIcon,
      badge: cartItemCount,
    },
  ];

  // AuthContext 에서 유저 아이디 받아오기
  const {userId} = useContext(AuthContext);

  // 장바구니 상품 수량 가져오기
  const fetchCartItemCount = async (userId: number) => {
    try {
      const response = await axios.get(`/api/carts/${userId}/cartItems`);
      if (response.status === 200) {
        setCartItemCount(response.data.length);
      } else {
        console.error('Failed to fetch cart items count');
      }
    } catch (error) {
      console.error('Error fetching cart items count', error);
    }
  };

  // 상품 정보 세팅
  useEffect(() => {
    fetchCategoryProducts();
    if (userId) {
      fetchCartItemCount(userId);
    } else {
      console.error('No user ID found in local storage');
    }
  }, []);

  //상품 정보 가져오기
  const fetchCategoryProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        `/api/products/${categoryValue}/active`,
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
      <Container sx={{ paddingTop: '50px', paddingBottom: '100px', minHeight: '800px' }}>
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
        <Box>
          <ProductCardList products={filteredItems} />
          <Box display="flex" justifyContent="center" mt={4}>

          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Fittness;
