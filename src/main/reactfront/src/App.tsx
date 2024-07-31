import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import GlobalStyle from './styles/common/GlobalStyle';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import MuiFontTheme from './styles/common/MuiFontTheme';

import Main from './pages/main/Main'; // 메인
import SigninPage from './pages/signin/SigninPage'; // 로그인
import SignupPage from './pages/signup/SignupPage'; // 회원가입
import Mall from './pages/mall/Mall'; // 쇼핑몰
import MallMain from './pages/mall/MallMain';
// import Products from './pages/mall/ProductCardList';
import ProductDetail from './pages/productDetail/ProductDetail';
import Fittness from './pages/mall/Fittness';
import Food from './pages/mall/Food';
import Supplement from './pages/mall/Supplement';
import OrderPage from './pages/order/OrderPage';
import Community from './pages/community/CommunityMain'; // 커뮤니티
import ViewPostDetail from './pages/community/ViewPostDetail';
import NewPost from './pages/community/NewPost';
import CommunityPostEdit from './pages/community/CommunityPostEdit';
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
import AdminPage from './pages/administrator/AdminPage'; // 관리자 페이지
import MemberListPage from './pages/administrator/MemberListPage';
import ItemListPage from './pages/administrator/ItemListPage';
import CommunityListPage from './pages/administrator/CommunityListPage';
import PostListPage from './pages/administrator/PostListPage';
import ReviewListPage from './pages/administrator/ReviewListPage';
import ItemInquiryListPage from './pages/administrator/ItemInquiryListPage';
import EtcInquiryListPage from './pages/administrator/EtcInquiryListPage';
import PostRegisterPage from './pages/administrator/PostRegisterPage';
import ItemRegisterPage from './pages/administrator/ItemRegisterPage';
import ItemUpdatePage from './pages/administrator/ItemUpdatePage';
import ShoppingBasketPage from './pages/shoppingBasket/ShoppingBasketPage';
import LoginSuccess from './components/naverLogin/LoginSuccess';
import NotFound from './pages/notFound/NotFound';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={MuiFontTheme}>
        <GlobalStyle />
        <Routes>
          <Route element={<HeaderFooterLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="sign-in" element={<SigninPage />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route path="sign-up" element={<SignupPage />} />
            <Route path="order-page" element={<OrderPage />} />
            <Route path="/shopping-basket" element={<ShoppingBasketPage />} />
            <Route path="/mall" element={<Mall />}>
              <Route path="main" element={<MallMain />} />
              <Route path="fitness" element={<Fittness />} />
              <Route path="supplement" element={<Supplement />} />
              <Route path="food" element={<Food />} />
            </Route>
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
            <Route path="community" element={<Community />} />
            <Route path="community/:postId" element={<ViewPostDetail />} />
            <Route path="community/new-post" element={<NewPost />} />
            <Route
              path="/community/edit/:postId"
              element={<CommunityPostEdit />}
            />
            <Route path="routine" element={<RoutineMain />} />
            <Route path="routine/:routineNo" element={<ViewRoutineDetail />} />
            <Route element={<PrivateRoute />}>
              <Route path="routine/new-routine" element={<NewRoutine />} />
            </Route>
            <Route path="info/search" element={<Info />} />
            <Route path="info/:infoId" element={<InfoDetail />} />
            <Route path="info/update/:infoId" element={<PostRegisterPage />} />
            <Route path="service" element={<Service />}>
              <Route index element={<Notice />} />
              <Route path="notice" element={<Notice />} />
              <Route path="notice/:noticeNum" element={<NoticeDetail />} />
              <Route path="event" element={<Event />} />
              <Route path="event/:eventNum" element={<EventDetail />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="inquiry" element={<Inquiry />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="mypage" element={<MyPageLayout />}>
                <Route index element={<MyHome />} />
                <Route path="user-info-login" element={<UserInfoLoginPage />} />
                <Route path="user-info" element={<UserInfoPage />} />
                <Route path="my-routine" element={<MyRoutinePage />}>
                  <Route index element={<MyRoutinesPage />} />
                  <Route path="my-routines" element={<MyRoutinesPage />} />
                  <Route
                    path="shared-routine"
                    element={<SharedRoutinePage />}
                  />
                  <Route path=":routineNo" element={<ViewRoutineDetail />} />
                </Route>
                <Route
                  path="post-management"
                  element={<PostManagementPage />}
                />
                <Route
                  path="comment-management"
                  element={<CommentManagementPage />}
                />
                <Route path="order-history" element={<OrderInfoPage />} />
                <Route
                  path="return-exchange"
                  element={<ReturnAndExchangePage />}
                />
                <Route
                  path="shipping-address"
                  element={<ShippingAddressPage />}
                />
                <Route path="product-review" element={<ProductReviewPage />} />
                <Route
                  path="product-inquiry"
                  element={<ProductInquiryPage />}
                />
                <Route
                  path="one-to-one-inquiry"
                  element={<OneToOneInquiryPage />}
                />
              </Route>
            </Route>
            <Route element={<PrivateRoute roles={['admin']} />}>
              <Route path="administrator" element={<AdminPage />}>
                <Route index element={<MemberListPage />} />
                <Route path="member-list" element={<MemberListPage />} />
                <Route path="item-list" element={<ItemListPage />} />
                <Route path="post-list" element={<PostListPage />} />
                <Route path="community-list" element={<CommunityListPage />} />
                <Route path="review-list" element={<ReviewListPage />} />
                <Route
                  path="item-inquiry-list"
                  element={<ItemInquiryListPage />}
                />
                <Route
                  path="etc-inquiry-list"
                  element={<EtcInquiryListPage />}
                />
              </Route>
              <Route
                path="administrator/post-register"
                element={<PostRegisterPage />}
              />
              <Route
                path="administrator/item-register"
                element={<ItemRegisterPage />}
              />
              <Route
                path="administrator/item-update/:productId"
                element={<ItemUpdatePage />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundLayout />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

const HeaderFooterLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const NotFoundLayout: React.FC = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default App;
