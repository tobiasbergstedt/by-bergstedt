import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.scss';
import useBreakpoint, { DESKTOP } from '@hooks/useBreakpoint';

interface NavLinkItem {
  title: string;
  link: string;
}

interface ItemComponentProps {
  item: NavLinkItem;
  onClick: () => void;
}

const NavItem = ({ item, onClick }: ItemComponentProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;

  return (
    <li onClick={onClick} className={styles.navLinkWrapper}>
      <NavLink
        to={item.link}
        className={styles.navLink}
        style={({ isActive }) =>
          isActive
            ? {
                textDecoration: 'underline',
                textDecorationColor: isDesktop
                  ? 'var(--color-blue-4)'
                  : 'var(--color-brown-2)',
                textUnderlineOffset: isDesktop ? '6px' : '4px',
              }
            : {}
        }
      >
        {item.title}
      </NavLink>
    </li>
  );
};

export default NavItem;
