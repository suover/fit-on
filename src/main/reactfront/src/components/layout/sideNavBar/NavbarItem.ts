import { SvgIconComponent } from '@mui/icons-material';

export interface NavbarItem {
  icon: SvgIconComponent;
  menuName: string;
  route: string;
  badge?: number;
  divider?: boolean;
}
