import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type OrderDetailsRefs,
  type FormState,
  type ShoppingCartItem,
} from '@interfaces/interfaces';
import { ReactComponent as CartEmptyIcon } from '@assets/icons/checkout-fail.svg';
import styles from '../Checkout.module.scss';

// Import the sub-components
// Assume these are defined in their respective files and imported here
import ShippingAndPayment from './ShippingAndPayment';
import ProductsList from './ProductsList';
import Button from '@components/Button/Button';
import OrderTotals from './OrderTotals';

interface OrderDetailsFormProps {
  shoppingCart: ShoppingCartItem[] | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  configRefs: OrderDetailsRefs;
  shippingCost: number;
  cartTotal: number;
}

const OrderDetailsForm = ({
  shoppingCart,
  formState,
  setFormState,
  configRefs,
  shippingCost,
  cartTotal,
}: OrderDetailsFormProps): JSX.Element => {
  const { t } = useTranslation();

  const handleOptionChange = (value: string, field: keyof FormState): void => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  if (shoppingCart === null) {
    return (
      <div className={styles.cartEmpty}>
        <CartEmptyIcon className={styles.cartEmptyIcon} />
        <h2 className={styles.cartEmptyHeading}>{t('shoppingCart.empty')}</h2>
        <p>{t('checkout.cartEmpty')}</p>
      </div>
    );
  }

  useEffect(() => {
    handleOptionChange('swish', 'payment');
  }, [formState.pickup]);

  return (
    <div className={styles.orderDetails}>
      <h2 className={styles.orderHeading}>{t('checkout.orderHeading')}</h2>
      <ShippingAndPayment
        formState={formState}
        onOptionChange={handleOptionChange}
        configRefs={configRefs}
      />
      <ProductsList shoppingCart={shoppingCart} />
      <OrderTotals shippingCost={shippingCost} cartTotal={cartTotal} />
      <Button type="submit" className={styles.orderButton} isFullWidth>
        {t('checkout.placeOrderButton')}
      </Button>
    </div>
  );
};

export default OrderDetailsForm;
