import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Divider from '@mui/material/Divider';

import { NavbarItem } from './NavbarItem';
import StyledAvatar from './StyledAvatar';

interface SideNavbarProps {
  menuItems: NavbarItem[];
  drawerPosition?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  drawerWidthOpen: number;
  paddingIconButton: number;
  marginIconButton: number;
  fontSize?: number;
  iconSize?: number;
  iconMargin: number;
  title: string;
  showProfile?: boolean;
}

const SideNavbar: React.FC<SideNavbarProps> = ({
  menuItems,
  drawerPosition = 'static',
  drawerWidthOpen,
  paddingIconButton,
  marginIconButton,
  fontSize = 14,
  iconSize = 20,
  iconMargin,
  title,
  showProfile = true,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const drawerWidthClose =
    (paddingIconButton + marginIconButton) * 2 + iconMargin;

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '42px',
          width: 'auto',
          backgroundColor: 'transparent',
          margin: '14px 14px',
          padding: '8px 0px',
          borderBottom: '1px solid black',
          alignItems: 'flex-end',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: open ? 'none' : { xs: 'none', sm: 'initial' },
            marginBottom: '9px',
          }}
        ></Box>
        <Typography
          variant="h1"
          noWrap={true}
          gutterBottom
          sx={{
            display: open ? 'initial' : 'none',
            fontSize: '18px',
            fontWeight: 600,
            color: 'black',
            width: '154px',
            marginLeft: open ? '0px' : '8px',
            paddingBottom: '5px',
          }}
        >
          {title}
        </Typography>

        <Button
          onClick={toggleOpen}
          sx={{
            minWidth: 'initial',
            padding: '10px',
            color: 'gray',
            borderRadius: '8px',
            backgroundColor: open ? 'transparent' : 'transparent',
            '&:hover': {
              backgroundColor: '#26284687',
            },
          }}
        >
          <MenuIcon
            sx={{ fontSize: '20px', color: open ? 'black' : 'black' }}
          />
        </Button>
      </Box>

      <List dense={true}>
        {menuItems.map((item: NavbarItem, index: number) => (
          <React.Fragment key={index}>
            <Tooltip title={open ? '' : item.menuName} placement="right">
              <ListItemButton
                onClick={() => navigate(item.route)}
                sx={{
                  margin: '6px 14px',
                  padding: '10px',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#26284687',
                  },
                }}
              >
                <ListItemIcon>
                  <Badge badgeContent={item.badge} color="secondary">
                    <item.icon sx={{ fontSize: iconSize, color: 'black' }} />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={item.menuName}
                  primaryTypographyProps={{
                    variant: 'body2',
                    style: { fontSize: fontSize },
                  }}
                  sx={{
                    display: 'inline',
                    margin: '0px',
                    overflowX: 'hidden',
                    color: 'black',
                    whiteSpace: 'nowrap',
                    minWidth: '126px',
                  }}
                />
              </ListItemButton>
            </Tooltip>
            {item.divider && <Divider />}
          </React.Fragment>
        ))}
      </List>

      {showProfile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContents: 'center',
            margin: '14px 14px',
            padding: '12px 4px 3px',
            borderTop: '1px solid black',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginRight: '18px',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <StyledAvatar />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontFamily: 'inherit',
                display: 'block',
                whiteSpace: 'nowrap',
                lineHeight: 'inherit',
                fontWeight: 500,
                color: 'black',
              }}
            >
              홍길동님
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                display: 'block',
                whiteSpace: 'nowrap',
                lineHeight: 'inherit',
                color: 'black',
              }}
            >
              nickname
            </Typography>
          </Box>
          <IconButton sx={{ color: 'black' }}>
            <ExitToAppIcon />
          </IconButton>
        </Box>
      )}
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClose,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            position: drawerPosition,
            height: 'auto',
            justifyContent: 'space-between',
            overflowX: 'hidden',
            width: open ? drawerWidthOpen : drawerWidthClose,
            borderRight: '0px',
            borderRadius: '16px',
            boxShadow: theme.shadows[8],
            backgroundColor: open
              ? 'transparent'
              : theme.palette.background.default,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            paddingBottom: showProfile ? '0' : '1rem',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SideNavbar;
