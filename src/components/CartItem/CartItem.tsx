import { type Dispatch, type SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import { type ShoppingCartItem } from '@interfaces/interfaces';
import { renderProductName } from '@utils/cart';
import formatPrice from '@utils/format-price';

import { ReactComponent as RemoveCross } from '@assets/icons/close-cross.svg';

import styles from './CartItem.module.scss';

const CartItem = ({
  item,
  onRemove,
  isOrderItem,
}: {
  item: ShoppingCartItem;
  onRemove: (
    itemId: string,
    shoppingCart: ShoppingCartItem[] | null,
    setShoppingCart: Dispatch<SetStateAction<ShoppingCartItem[] | null>>,
  ) => void;
  isOrderItem: boolean;
}): JSX.Element => {
  const { locale, shoppingCart, setShoppingCart } = useContext(UserContext);

  const { t } = useTranslation();

  return (
    <li
      key={item.productId}
      className={isOrderItem ? styles.orderItem : styles.cartItem}
    >
      <RemoveCross
        className={styles.removeCross}
        onClick={() => {
          onRemove(item.productId, shoppingCart, setShoppingCart);
        }}
      />
      <Link
        to={`/product/${item.productId}`}
        className={isOrderItem ? styles.orderItemImage : styles.cartItemImage}
      >
        <img
          src={item.image}
          alt={`${t('cartItem.imgAlt')} ${
            locale === 'sv' ? item.name.sv : item.name.en
          }`}
        />
      </Link>
      <Link
        to={`/product/${item.productId}`}
        className={isOrderItem ? styles.orderItemName : styles.cartItemName}
      >
        <div className={styles.productNameAndPrice}>
          <span>{renderProductName(item, locale, t('locales.en'))}</span>
          <span
            className={
              isOrderItem ? styles.orderItemPrice : styles.cartItemPrice
            }
          >
            {formatPrice(item.price)} {t('misc.currencies.sek')}
          </span>
        </div>
      </Link>
      <p>{item.amount}</p>
      {isOrderItem && (
        <p className={styles.individualSum}>
          {formatPrice(item.price * item.amount)} {t('misc.currencies.sek')}
        </p>
      )}
    </li>
  );
};

export default CartItem;
