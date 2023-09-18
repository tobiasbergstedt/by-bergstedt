import styles from './Header.module.scss';
// import { fixUrl } from '../../utils'
import ByBergstedtLogo from '../../assets/icons/logo2.svg';

import { useState } from 'react';
import useBreakpoint, { DESKTOP } from '../../hooks/useBreakpoint';
import { NavLink } from 'react-router-dom';
import SocialMedia from '../SocialMedia/SocialMedia';
import LanguagePicker from './LanguagePicker/LanguagePicker';
import { useTranslation } from 'react-i18next';

interface NavLinkItem {
  title: string;
  link: string;
}

const Header = (): JSX.Element => {
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);

  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;

  const currentYear = new Date().getFullYear();

  const navLinks = [
    {
      title: t('menu.start'),
      link: '/',
    },
    {
      title: t('menu.gallery'),
      link: 'gallery',
    },
    {
      title: t('menu.shop'),
      link: 'shop',
    },
    {
      title: t('menu.about'),
      link: 'about',
    },
    {
      title: t('menu.contact'),
      link: 'contact',
    },
    {
      title: t('menu.links'),
      link: 'links',
    },
  ];

  const toggleMenu = (): void => {
    setIsNavExpanded(!isNavExpanded);
  };

  const closeMenu = (): void => {
    setIsNavExpanded(false);
  };

  interface ItemComponentProps {
    item: NavLinkItem;
  }

  const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    return (
      <li onClick={closeMenu}>
        <NavLink to={item.link} className={`${styles.navLink}`}>
          {item.title}
        </NavLink>
      </li>
    );
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink to="/" className={`${styles.logo}`}>
          <img
            src={ByBergstedtLogo}
            alt="byBergstedt logo"
            className={styles.logoImg}
          />
        </NavLink>
        <LanguagePicker />
        <ul
          className={`${styles.navMenu} ${isNavExpanded ? styles.active : ''}`}
        >
          {navLinks.map((item, index) => (
            <ItemComponent key={index} item={item} />
          ))}
          {!isDesktop && (
            <>
              <SocialMedia isDesktop={false} />
              <div className={`${styles.copyRight}`}>
                {t('header.copyright', { thisYear: currentYear })}
              </div>
            </>
          )}
        </ul>

        <div
          className={`${styles.hamburger} ${
            isNavExpanded ? styles.active : ''
          }`}
          onClick={toggleMenu}
        >
          <span className={`${styles.bar}`}></span>
          <span className={`${styles.bar}`}></span>
          <span className={`${styles.bar}`}></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
