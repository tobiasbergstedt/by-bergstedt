import {
  type ShippingRate,
  type ShoppingCartItem,
} from '@interfaces/interfaces';
import { type Dispatch, type SetStateAction } from 'react';

export const removeFromCart = (
  itemId: string,
  shoppingCart: ShoppingCartItem[] | null,
  setShoppingCart: Dispatch<SetStateAction<ShoppingCartItem[] | null>>,
): void => {
  if (shoppingCart !== null) {
    const updatedCart = shoppingCart.filter(
      (item) => item.productId !== itemId,
    );
    console.log(updatedCart);

    if (updatedCart.length === 0) {
      setShoppingCart(null);
      return;
    }
    setShoppingCart(updatedCart);
  }
};

const calculateTotalWeight = (shoppingCart: ShoppingCartItem[]): number => {
  return shoppingCart.reduce((total: number, currentItem: ShoppingCartItem) => {
    const shippingTotal = currentItem.weight * currentItem.amount;
    return total + shippingTotal;
  }, 0);
};

const calculateShippingCost = (
  weight: number,
  shippingRates: ShippingRate[],
  chosenCountry: string,
): number => {
  if (typeof shippingRates !== 'string') {
    // Find a shipping rate that matches the weight criteria
    const rate = shippingRates.find(
      (rate) => weight <= rate.attributes.maxWeight,
    );

    if (rate == null) {
      return 199; // Default shipping cost if no matching rate is found
    }

    // Determine the price based on the chosen country
    switch (chosenCountry) {
      case 'Sweden':
        return rate.attributes.priceSE;
      case 'EU':
        return rate.attributes.priceEU;
      case 'Other':
        return rate.attributes.priceOther;
      default:
        return rate.attributes.priceSE;
    }
  }
  return 0;
};

export const getShipping = (
  shoppingCart: ShoppingCartItem[] | null,
  shippingRates: ShippingRate[],
  chosenCountry: string,
): number => {
  if (shoppingCart === null) {
    return 0;
  }

  const shipping = calculateShippingCost(
    calculateTotalWeight(shoppingCart),
    shippingRates,
    chosenCountry,
  );

  return shipping;
};

export const getCartTotal = (
  shoppingCart: ShoppingCartItem[] | null,
  shippingRates: ShippingRate[],
  chosenCountry: string,
): number => {
  if (shoppingCart === null) {
    return 0;
  }
  const cartTotal = shoppingCart.reduce(
    (total: number, currentItem: ShoppingCartItem) => {
      const itemTotal = currentItem.price * currentItem.amount;
      return total + itemTotal;
    },
    0,
  );

  const totalPlusShipping =
    cartTotal +
    calculateShippingCost(
      calculateTotalWeight(shoppingCart),
      shippingRates,
      chosenCountry,
    );

  return totalPlusShipping;
};

export const getCartSum = (shoppingCart: ShoppingCartItem[] | null): number => {
  if (shoppingCart === null) {
    return 0;
  }
  const cartSum = shoppingCart.reduce(
    (total: number, currentItem: ShoppingCartItem) => {
      const itemTotal = currentItem.price * currentItem.amount;
      return total + itemTotal;
    },
    0,
  );

  return cartSum;
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
