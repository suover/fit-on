import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import HomeOutlined from '@mui/icons-material/HomeOutlined';
import AccountBoxOutlined from '@mui/icons-material/AccountBoxOutlined';
import FitnessCenterOutlined from '@mui/icons-material/FitnessCenterOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import CommentOutlined from '@mui/icons-material/CommentOutlined';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import SwapHorizOutlined from '@mui/icons-material/SwapHorizOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import RateReviewOutlined from '@mui/icons-material/RateReviewOutlined';
import QuestionAnswerOutlined from '@mui/icons-material/QuestionAnswerOutlined';
import ContactSupportOutlined from '@mui/icons-material/ContactSupportOutlined';

import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import MyHome from './MyHome';
import UserInfoPage from './UserInfoPage';
import MyRoutinePage from './MyRoutinePage';
import PostManagementPage from './PostManagementPage';
import CommentManagementPage from './CommentManagementPage';
import OrderInfoPage from './OrderHistoryPage';
import ReturnAndExchangePage from './ReturnAndExchangePage';
import ShippingAddressPage from './ShippingAddressPage';
import ProductReviewPage from './ProductReviewPage';
import ProductInquiryPage from './ProductInquiryPage';
import OneToOneInquiryPage from './OneToOneInquiryPage';
import UserInfoLoginPage from './UserInfoLoginPage';

const menuItems = [
  {
    icon: HomeOutlined,
    menuName: '마이 홈',
    route: '/mypage',
    badge: 0,
    divider: true,
  },
  {
    icon: AccountBoxOutlined,
    menuName: '회원정보',
    route: '/mypage/user-info-login',
    badge: 0,
  },
  {
    icon: FitnessCenterOutlined,
    menuName: '나의 루틴',
    route: '/mypage/my-routine',
    badge: 0,
  },
  {
    icon: ArticleOutlined,
    menuName: '게시글 관리',
    route: '/mypage/post-management',
    badge: 0,
  },
  {
    icon: CommentOutlined,
    menuName: '댓글 관리',
    route: '/mypage/comment-management',
    badge: 0,
    divider: true,
  },
  {
    icon: ListAltOutlined,
    menuName: '주문 내역',
    route: '/mypage/order-history',
    badge: 0,
  },
  {
    icon: SwapHorizOutlined,
    menuName: '취소 / 반품 / 교환 조회',
    route: '/mypage/return-exchange',
    badge: 0,
  },
  {
    icon: LocationOnOutlined,
    menuName: '배송지 관리',
    route: '/mypage/shipping-address',
    badge: 0,
    divider: true,
  },
  {
    icon: RateReviewOutlined,
    menuName: '상품 리뷰',
    route: '/mypage/product-review',
    badge: 0,
  },
  {
    icon: QuestionAnswerOutlined,
    menuName: '상품 문의',
    route: '/mypage/product-inquiry',
    badge: 0,
  },
  {
    icon: ContactSupportOutlined,
    menuName: '1:1 문의 내역',
    route: '/mypage/one-to-one-inquiry',
    badge: 0,
  },
];

const MyPageLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          marginTop: '100px',
          marginBottom: '100px',
          marginRight: '285px',
          width: '100%',
          maxWidth: '1440px',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <SideNavbar
          menuItems={menuItems}
          drawerWidthOpen={'245px'}
          title="FitOn MyPage"
          drawerPosition="static"
          marginTop="20px"
        />
        <Box component="main" sx={{ flexGrow: 1, pl: 5 }}>
          <Routes>
            <Route path="/" element={<MyHome />} />
            <Route path="user-info-login" element={<UserInfoLoginPage />} />
            <Route path="user-info" element={<UserInfoPage />} />
            <Route path="my-routine" element={<MyRoutinePage />} />
            <Route path="post-management" element={<PostManagementPage />} />
            <Route
              path="comment-management"
              element={<CommentManagementPage />}
            />
            <Route path="order-history" element={<OrderInfoPage />} />
            <Route path="return-exchange" element={<ReturnAndExchangePage />} />
            <Route path="shipping-address" element={<ShippingAddressPage />} />
            <Route path="product-review" element={<ProductReviewPage />} />
            <Route path="product-inquiry" element={<ProductInquiryPage />} />
            <Route
              path="one-to-one-inquiry"
              element={<OneToOneInquiryPage />}
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default MyPageLayout;
