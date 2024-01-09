import { type ShoppingCartItem } from '@interfaces/interfaces';
import { type Dispatch, type SetStateAction } from 'react';
import formatPrice from '@utils/format-price';

export const removeFromCart = (
  itemId: string,
  shoppingCart: ShoppingCartItem[] | null,
  setShoppingCart: Dispatch<SetStateAction<ShoppingCartItem[] | null>>,
): void => {
  if (shoppingCart !== null) {
    const updatedCart = shoppingCart.filter((item) => item.id !== itemId);
    console.log(updatedCart);

    if (updatedCart.length === 0) {
      setShoppingCart(null);
      return;
    }
    setShoppingCart(updatedCart);
  }
};

export const getCartTotal = (
  shoppingCart: ShoppingCartItem[] | null,
  currency: string,
): string => {
  if (shoppingCart === null) {
    return 'Error calculating.';
  }
  const cartTotal = shoppingCart.reduce(
    (total: number, currentItem: ShoppingCartItem) => {
      const itemTotal = currentItem.price * currentItem.amount;
      return total + itemTotal;
    },
    0,
  );

  const cartTotalString = `${formatPrice(cartTotal)} ${currency}`;
  return cartTotalString;
};

export const renderProductName = (
  orderItem: ShoppingCartItem,
  locale: string,
  chosenLanguage: string,
): string => {
  if (locale === chosenLanguage) {
    return orderItem.name.en;
  } else {
    return orderItem.name.sv;
  }
};
