import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ForumIcon from '@mui/icons-material/Forum';
import InfoIcon from '@mui/icons-material/Info';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HelpIcon from '@mui/icons-material/Help';
import { Outlet } from 'react-router-dom';
import {
  AdminContainer,
  ContentContainer,
  SidebarContainer,
} from '../../styles/admin/AdminPage.styles';
import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
const AdminPage: React.FC = () => {
  const menuItems = [
    {
      menuName: '회원 관리',
      route: '/admin/members',
      icon: PeopleIcon,
      badge: 0,
    },
    {
      menuName: '상품 관리',
      route: '/admin/items',
      icon: ShoppingCartIcon,
      badge: 0,
    },
    {
      menuName: '정보글 관리',
      route: '/admin/posts',
      icon: InfoIcon,
      badge: 0,
    },
    {
      menuName: '커뮤니티 관리',
      route: '/admin/communities',
      icon: ForumIcon,
      badge: 0,
    },
    {
      menuName: '리뷰 관리',
      route: '/admin/reviews',
      icon: RateReviewIcon,
      badge: 0,
    },
    {
      menuName: '상품문의 관리',
      route: '/admin/itemInquiries',
      icon: HelpIcon,
      badge: 0,
    },
    {
      menuName: '1:1문의 관리',
      route: '/admin/etcInquiries',
      icon: HelpIcon,
      badge: 0,
    },
  ];
  return (
    <>
      <AdminContainer>
        <SidebarContainer>
          <SideNavbar
            menuItems={menuItems}
            drawerWidthOpen="200px"
            title="관리자 페이지"
            showProfile={false}
            drawerPosition="sticky"
          />
        </SidebarContainer>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </AdminContainer>
    </>
  );
};

export default AdminPage;
