import React from 'react';
import CartItem from '@components/CartItem/CartItem';
import { type ShoppingCartItem } from '@interfaces/interfaces';
import styles from '../Checkout.module.scss';
import { removeFromCart } from '@utils/cart';

interface ProductsListProps {
  shoppingCart: ShoppingCartItem[];
}

const ProductsList = ({ shoppingCart }: ProductsListProps): JSX.Element => {
  return (
    <div>
      <h3 className={styles.productsHeading}>Products</h3>
      <ul className={styles.orderList}>
        {shoppingCart.map((orderItem) => (
          <CartItem
            key={orderItem.productId}
            item={orderItem}
            onRemove={removeFromCart}
            isOrderItem={true}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
