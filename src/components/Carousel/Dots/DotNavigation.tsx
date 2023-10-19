import React from 'react';
import clsx from 'clsx';

import styles from './DotNavigation.module.scss';

interface DotNavigationProps {
  onClick: () => void;
  active: boolean;
}

const DotNavigation: React.FC<DotNavigationProps> = ({ onClick, active }) => (
  <button
    className={clsx(styles.carouselDot, {
      [styles.active]: active,
    })}
    onClick={onClick}
  />
);

export default DotNavigation;
