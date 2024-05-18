import React from 'react';
import { Outlet } from 'react-router-dom';

import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import { NavbarItem } from '../../components/layout/sideNavBar/NavbarItem';
import { ServiceWrapper } from '../../styles/csCenter/ClientServie.styles';

import { Container } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const serviecMenu: NavbarItem[] = [
  { icon: AnnouncementIcon, menuName: '공지사항', route: 'notice' },
  { icon: LocalActivityIcon, menuName: '이벤트', route: 'event' },
  { icon: QuestionAnswerIcon, menuName: 'FAQ', route: 'faq' },
  { icon: ContactSupportIcon, menuName: '1:1문의', route: 'inquiry' },
];

const ClientService: React.FC = () => {
  return (
    <ServiceWrapper>
      <SideNavbar
        title="고객센터"
        drawerWidthOpen="200px"
        drawerPosition="sticky"
        menuItems={serviecMenu}
        showProfile={false}
        marginTop="80px"
      />
      <Container sx={{ paddingTop: '80px', marginLeft: 0, marginRight: 0 }}>
        <Outlet />
      </Container>
    </ServiceWrapper>
  );
};

export default ClientService;
