import { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import useBreakpoint, { DESKTOP } from '@hooks/useBreakpoint';

import ByBergstedtLogo from '@assets/icons/logo2.svg';

import SocialMedia from '@components/SocialMedia/SocialMedia';
import LanguagePicker from '@components/Header/LanguagePicker/LanguagePicker';
import NavItem from '@components/Header/NavItem/NavItem';

import styles from './Header.module.scss';

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
      title: t('menu.custom'),
      link: 'custom',
    },
    {
      title: t('menu.about'),
      link: 'about',
    },
    {
      title: t('menu.contact'),
      link: 'contact',
    },
  ];

  const toggleMenu = (): void => {
    setIsNavExpanded(!isNavExpanded);
  };

  const closeMenu = (): void => {
    setIsNavExpanded(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>
          <img
            src={ByBergstedtLogo}
            alt="byBergstedt logo"
            className={styles.logoImg}
          />
        </NavLink>
        <LanguagePicker />
        <ul
          className={clsx(styles.navMenu, {
            [styles.active]: isNavExpanded,
          })}
        >
          {navLinks.map((item, index) => (
            <NavItem key={index} item={item} onClick={closeMenu} />
          ))}
          {!isDesktop && (
            <>
              <SocialMedia isDesktop={false} />
              <div className={styles.copyRight}>
                {t('header.copyright', { thisYear: currentYear })}
              </div>
            </>
          )}
        </ul>

        <div
          className={clsx(styles.hamburger, {
            [styles.active]: isNavExpanded,
          })}
          onClick={toggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
