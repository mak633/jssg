import { LayoutGrid } from '@shared/components/icons';
import { NavSection } from '@shared/components/ui/layout/sidebar';

const NavSections: NavSection[] = [
  {
    title: 'Platform',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: <LayoutGrid />,
        'data-testid': 'menu-item-dashboard',
      },
    ],
  },
];

export default NavSections;
