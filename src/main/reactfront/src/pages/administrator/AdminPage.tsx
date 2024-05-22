import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ForumIcon from '@mui/icons-material/Forum';
import InfoIcon from '@mui/icons-material/Info';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HelpIcon from '@mui/icons-material/Help';
import { Outlet } from 'react-router-dom';
import { AdminContainer } from '../../styles/administrator/AdminPage.styles';
import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import SidebarWrapper from '../../components/common/sidebar/SidebarWrapper';
import { Container } from '@mui/material';

const AdminPage: React.FC = () => {
  const menuItems = [
    {
      menuName: '회원 관리',
      route: '/administrator/member-list',
      icon: PeopleIcon,
      badge: 0,
    },
    {
      menuName: '상품 관리',
      route: '/administrator/item-list',
      icon: ShoppingCartIcon,
      badge: 0,
    },
    {
      menuName: '정보글 관리',
      route: '/administrator/post-list',
      icon: InfoIcon,
      badge: 0,
    },
    {
      menuName: '커뮤니티 관리',
      route: '/administrator/community-list',
      icon: ForumIcon,
      badge: 0,
    },
    {
      menuName: '리뷰 관리',
      route: '/administrator/review-list',
      icon: RateReviewIcon,
      badge: 0,
    },
    {
      menuName: '상품문의 관리',
      route: '/administrator/item-inquiry-list',
      icon: HelpIcon,
      badge: 0,
    },
    {
      menuName: '1:1문의 관리',
      route: '/administrator/etc-inquiry-list',
      icon: HelpIcon,
      badge: 0,
    },
  ];
  return (
    <>
      <AdminContainer>
        <SidebarWrapper>
          <SideNavbar
            menuItems={menuItems}
            drawerWidthOpen="200px"
            title="관리자 페이지"
            showProfile={false}
            drawerPosition="sticky"
          />
        </SidebarWrapper>
        <Container sx={{ paddingTop: '80px', paddingBottom: '100px' }}>
          <Outlet />
        </Container>
      </AdminContainer>
    </>
  );
};

export default AdminPage;
