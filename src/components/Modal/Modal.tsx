import { useRef } from 'react';
import clsx from 'clsx';

import CloseCross from '@assets/icons/close-cross.svg';

import styles from './Modal.module.scss';

const noop = (): void => {};

interface Props {
  children: JSX.Element;
  className: string;
  hasCloseButton: boolean;
  canClose: boolean;
  onClick: () => void;
}

const Modal = ({
  children,
  className,
  hasCloseButton,
  canClose,
  onClick,
}: Props): JSX.Element => {
  const scrollRef = useRef(null);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <button
        type="button"
        className={clsx(styles.bg, {
          [styles.canClose]: canClose,
        })}
        onClick={onClick ?? noop}
      />
      <div className={styles.modal}>
        <div ref={scrollRef} className={styles.scroll}>
          {children}
        </div>

        {hasCloseButton && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClick ?? noop}
          >
            <div
              className={styles.icon}
              style={{
                maskImage: `url(${CloseCross})`,
                WebkitMaskImage: `url(${CloseCross})`,
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  className: null,
  hasCloseButton: true,
  canClose: true,
  onClick: () => {},
};

export default Modal;
