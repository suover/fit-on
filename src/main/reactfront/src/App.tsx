import React from 'react';
import { Route, Routes } from 'react-router-dom';

import GlobalStyle from './styles/common/GlobalStyle';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import MuiFontTheme from './styles/common/MuiFontTheme';

import Main from './pages/main/Main'; // 메인
import ProductMain from './pages/mall/ProductMain';
import Community from './pages/community/CommunityMain'; // 커뮤니티
import ViewPostDetail from './pages/community/ViewPostDetail';
import NewPost from './pages/community/NewPost';
import RoutineMain from './pages/routine/RoutineMain'; // 루틴
import ViewRoutineDetail from './pages/routine/ViewRoutineDetail';
import NewRoutine from './pages/routine/NewRoutine';
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

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mall" element={<ProductMain />} />
        <Route path="community" element={<Community />} />
        <Route path="community/post/:postNo" element={<ViewPostDetail />} />
        <Route path="community/new-post" element={<NewPost />} />
        <Route path="routine" element={<RoutineMain />} />
        <Route path="routine/:routineNo" element={<ViewRoutineDetail />} />
        <Route path="new-routine" element={<NewRoutine />} />
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
          <Route path="one-to-one-inquiry" element={<OneToOneInquiryPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
