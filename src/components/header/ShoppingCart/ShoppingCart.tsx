import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useBreakpoint, { TABLET_PORTRAIT, DESKTOP } from '@hooks/useBreakpoint';
import { UserContext } from '@context/UserContext';
import { getCartTotal, removeFromCart } from '@utils/cart';

import Button from '@components/Button/Button';

import CartIcon from '@assets/icons/shopping-cart.svg';
import { ReactComponent as ArrowDownIcon } from '@assets/icons/arrowdown.svg';

import styles from './ShoppingCart.module.scss';
import CartItem from '@components/CartItem/CartItem';

const ShoppingCart = (): JSX.Element => {
  const { shoppingCart } = useContext(UserContext);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const breakpoint = useBreakpoint();
  const isTablet = breakpoint === TABLET_PORTRAIT;
  const isDesktop = breakpoint === DESKTOP;

  const location = useLocation();

  const toggleShoppingCart = (): void => {
    setIsShoppingCartOpen(!isShoppingCartOpen);
  };

  const getTotalAmount = (): number => {
    if (shoppingCart == null) {
      return 0; // Return 0 if the shoppingCart is null or empty
    }

    const totalAmount = shoppingCart.reduce((total, currentItem) => {
      return total + currentItem.amount;
    }, 0);

    return totalAmount;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        componentRef.current !== null &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsShoppingCartOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isShoppingCartOpen) {
      setIsShoppingCartOpen(false);
    }
  }, [location]);

  return (
    <div
      className={clsx(styles.shoppingCartContainer, {
        [styles.isShoppingCartOpen]: isShoppingCartOpen,
      })}
      ref={componentRef}
    >
      <div className={styles.shoppingCart} onClick={toggleShoppingCart}>
        <div
          className={clsx(styles.amountInCart, {
            [styles.cartHasItems]:
              shoppingCart !== null && shoppingCart.length > 0,
          })}
        >
          {getTotalAmount()}
        </div>
        <div
          className={styles.cartIcon}
          style={{
            maskImage: `url(${CartIcon})`,
            WebkitMaskImage: `url(${CartIcon})`,
          }}
        ></div>
        {(isTablet || isDesktop) && (
          <span
            className={clsx(styles.arrowDown, {
              [styles.isRotated]: isShoppingCartOpen,
            })}
          >
            <ArrowDownIcon />
          </span>
        )}
      </div>
      <ul
        className={clsx(styles.cartList, {
          [styles.isInvisible]: !isShoppingCartOpen,
        })}
      >
        {shoppingCart !== null ? (
          <>
            <li className={styles.cartItem}>
              <span />
              <span className={styles.imageHeadingPlaceholder} />
              <p>{t('shoppingCart.item')}</p>
              <p>{t('shoppingCart.amount')}</p>
            </li>
            {shoppingCart?.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                onRemove={removeFromCart}
                isOrderItem={false}
              />
            ))}
            <div className={styles.cartTotal}>
              <p>{t('shoppingCart.total')}:</p>
              <p>{getCartTotal(shoppingCart, t('misc.currencies.sek'))}</p>
            </div>
            <div
              onClick={() => {
                setIsShoppingCartOpen(false);
              }}
            >
              <Button isFullWidth to="checkout">
                {t('shoppingCart.toCheckout')}
              </Button>
            </div>
          </>
        ) : (
          <p className={styles.emptyCart}>{t('shoppingCart.empty')}</p>
        )}
      </ul>
    </div>
  );
};

export default ShoppingCart;
