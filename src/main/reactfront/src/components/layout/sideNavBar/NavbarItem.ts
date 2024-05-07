import { ComponentType } from 'react';

export interface NavbarItem {
  icon: ComponentType<any>;
  menuName: string;
  route: string;
  badge?: number;
  divider?: boolean;
}
