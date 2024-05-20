import React from 'react';
import { Route, Routes } from 'react-router-dom';

import GlobalStyle from './styles/common/GlobalStyle';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import MuiFontTheme from './styles/common/MuiFontTheme';

import Main from './pages/main/Main'; // 메인
import SigninPage from './pages/Signin/SigninPage'; // 회원가입
import SignupPage from './pages/Signup/SignupPage';
import Mall from './pages/mall/Mall'; // 쇼핑몰
import Products from './pages/mall/Products';
import Fittness from './pages/mall/Fittness';
import Food from './pages/mall/Food';
import Supplement from './pages/mall/Supplemnet';
import ProductDetail from './pages/productDetail/productDetail';
import Community from './pages/community/CommunityMain'; // 커뮤니티
import ViewPostDetail from './pages/community/ViewPostDetail';
import NewPost from './pages/community/NewPost';
import RoutineMain from './pages/routine/RoutineMain'; // 루틴
import ViewRoutineDetail from './pages/routine/ViewRoutineDetail';
import NewRoutine from './pages/routine/NewRoutine';
import Info from './pages/information/Info'; // 정보
import InfoDetail from './pages/information/InfoDetail';
import Service from './pages/csCenter/ClientService'; // CS Center
import Notice from './pages/csCenter/Notice';
import NoticeDetail from './pages/csCenter/NoticeDetail';
import Event from './pages/csCenter/Event';
import EventDetail from './pages/csCenter/EventDetail';
import FAQ from './pages/csCenter/FAQ';
import Inquiry from './pages/csCenter/Inquiry';
import MyPageLayout from './pages/mypage/MyPageLayout'; // 마이페이지
import MyHome from './pages/mypage/MyHome';
import UserInfoPage from './pages/mypage/UserInfoPage';
import MyRoutinePage from './pages/mypage/MyRoutinePage';
import PostManagementPage from './pages/mypage/PostManagementPage';
import CommentManagementPage from './pages/mypage/CommentManagementPage';
import OrderInfoPage from './pages/mypage/OrderHistoryPage';
import ReturnAndExchangePage from './pages/mypage/ReturnAndExchangePage';
import ShippingAddressPage from './pages/mypage/ShippingAddressPage';
import ProductReviewPage from './pages/mypage/ProductReviewPage';
import ProductInquiryPage from './pages/mypage/ProductInquiryPage';
import OneToOneInquiryPage from './pages/mypage/OneToOneInquiryPage';
import UserInfoLoginPage from './pages/mypage/UserInfoLoginPage';
import SharedRoutinePage from './pages/mypage/SharedRoutinePage';
import MyRoutinesPage from './pages/mypage/MyRoutinesPage';
import AdminPage from './pages/admin/AdminPage'; // 관리자 페이지
import MemberListPage from './pages/admin/MemberListPage';
import ItemListPage from './pages/admin/ItemListPage';
import PostListPage from './pages/admin/PostListPage';
import CommunityListPage from './pages/admin/CommunityListPage';
import ReviewListPage from './pages/admin/ReviewListPage';
import ItemInquiryListPage from './pages/admin/ItemInquiryListPage';
import EtcInquiryListPage from './pages/admin/EtcInquiryListPage';
import ItemRegisterPage from './pages/admin/ItemRegisterPage';
import PostRegisterPage from './pages/admin/PostRegisterPage';

const App = () => {
  return (
    <ThemeProvider theme={MuiFontTheme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="sign-in" element={<SigninPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="/mall" element={<Mall />}>
          <Route index element={<Products />} />
          <Route path="fitness" element={<Fittness />} />
          <Route path="supplement" element={<Supplement />} />
          <Route path="food" element={<Food />} />
          <Route
            path="product-detail/:productNum"
            element={<ProductDetail />}
          ></Route>
        </Route>
        <Route></Route>
        <Route path="community" element={<Community />} />
        <Route path="community/post/:postNo" element={<ViewPostDetail />} />
        <Route path="community/new-post" element={<NewPost />} />
        <Route path="routine" element={<RoutineMain />} />
        <Route path="routine/:routineNo" element={<ViewRoutineDetail />} />
        <Route path="new-routine" element={<NewRoutine />} />
        <Route path="info" element={<Info />} />
        <Route path="info/:infoNum" element={<InfoDetail />} />
        <Route path="service" element={<Service />}>
          <Route index element={<Notice />} />
          <Route path="notice" element={<Notice />} />
          <Route path="notice/:noticeNum" element={<NoticeDetail />} />
          <Route path="event" element={<Event />} />
          <Route path="event/:eventNum" element={<EventDetail />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="inquiry" element={<Inquiry />} />
        </Route>
        <Route path="mypage" element={<MyPageLayout />}>
          <Route index element={<MyHome />} />
          <Route path="user-info-login" element={<UserInfoLoginPage />} />
          <Route path="user-info" element={<UserInfoPage />} />
          <Route path="my-routine" element={<MyRoutinePage />}>
            <Route index element={<MyRoutinesPage />} />
            <Route path="my-routines" element={<MyRoutinesPage />} />
            <Route path="shared-routine" element={<SharedRoutinePage />} />
          </Route>
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
          <Route path="one-to-one-inquiry" element={<OneToOneInquiryPage />} />
        </Route>
        <Route path="admin" element={<AdminPage />}>
          <Route path="member-list" element={<MemberListPage />} />
          <Route path="item-list" element={<ItemListPage />} />
          <Route path="post-list" element={<PostListPage />} />
          <Route path="community-list" element={<CommunityListPage />} />
          <Route path="review-list" element={<ReviewListPage />} />
          <Route path="item-inquiry-list" element={<ItemInquiryListPage />} />
          <Route path="etc-inquiry-list" element={<EtcInquiryListPage />} />
        </Route>
        <Route path="post-register" element={<PostRegisterPage />} />
        <Route path="item-register" element={<ItemRegisterPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
