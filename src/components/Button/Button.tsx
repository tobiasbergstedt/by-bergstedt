import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  type?: 'button' | 'submit';
  to?: string;
  href?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isSecondary?: boolean;
  isTertiary?: boolean;
  isQuaternary?: boolean;
  isText?: boolean;
  hasIcon?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const noop = (): void => {};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  to,
  href,
  isDisabled,
  isFullWidth,
  isSecondary,
  isTertiary,
  isQuaternary,
  isText,
  hasIcon,
  onClick,
}) => {
  const classNames = clsx(styles.button, className, {
    [styles.isDisabled]: isDisabled,
    [styles.isSecondary]: isSecondary,
    [styles.isTertiary]: isTertiary,
    [styles.isQuaternary]: isQuaternary,
    [styles.isText]: isText,
    [styles.isFullWidth]: isFullWidth,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onClick != null && onClick(event);
  };

  const text = (): JSX.Element | null => {
    if (React.Children.count(children) > 0) {
      return <span>{children}</span>;
    }
    return null;
  };

  if (href != null) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classNames}>
        {text()}
      </a>
    );
  }

  if (to != null) {
    return (
      <Link to={to} className={classNames} onClick={() => handleClick}>
        {text()}
      </Link>
    );
  }

  return (
    <>
      <button
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClick}
        disabled={isDisabled}
        className={clsx(classNames, {
          [styles.hasIconButton]: hasIcon,
        })}
        onTouchStart={noop} // Otherwise :active won't work.
      >
        {text()}
        {hasIcon != null && <img src={hasIcon} className={styles.hasIcon} />}
      </button>
    </>
  );
};

Button.defaultProps = {
  className: '',
  type: 'button',
  to: undefined,
  href: undefined,
  isDisabled: false,
  isSecondary: false,
  hasIcon: undefined,
  onClick: () => {},
};

export default Button;
