import { type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type OrderDetailsRefs,
  type FormState,
  type RadioOption,
  type ShoppingCartItem,
} from '@interfaces/interfaces';
import { removeFromCart } from '@utils/cart';
import formatPrice from '@utils/format-price';

import Radio from '@components/Inputs/Radio/Radio';
import Select from '@components/Inputs/Select/Select';
import CartItem from '@components/CartItem/CartItem';
import Button from '@components/Button/Button';

import { ReactComponent as CartEmptyIcon } from '@assets/icons/checkout-fail.svg';

import styles from '../Checkout.module.scss';

interface OrderDetailsFormProps {
  shoppingCart: ShoppingCartItem[] | null;
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
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

  const radioOptions: RadioOption[] = [
    { value: 'pickup', label: t('checkout.pickup') },
    { value: 'ship', label: t('checkout.shipTo') },
    // ... add more options here
  ];

  const paymentOptions: RadioOption[] = [
    { value: 'swish', label: t('checkout.swish') },
    { value: 'card', label: t('checkout.card') },
    { value: 'cash', label: t('checkout.cash') },
    // ... add more options here
  ];

  const countrySelectValues = [
    {
      value: t('checkout.countriesSelect.sweden'),
      label: t('checkout.form.countries.sweden'),
    },
    {
      value: t('checkout.countriesSelect.eu'),
      label: t('checkout.form.countries.eu'),
    },
    {
      value: t('checkout.countriesSelect.other'),
      label: t('checkout.form.countries.other'),
    },
  ];

  return (
    <div className={styles.orderDetails}>
      {shoppingCart !== null ? (
        <>
          <h2 className={styles.orderHeading}>{t('checkout.orderHeading')}</h2>
          <div className={styles.shippingAndPaymentContainer}>
            <h3 className={styles.shippingAndPaymentHeading}>
              {t('checkout.shippingAndPayment')}
            </h3>
            <Radio
              options={radioOptions}
              selectedOption={formState.pickup}
              onOptionChange={(e) => {
                setFormState({
                  ...formState,
                  pickup: e,
                  payment: e === 'pickup' ? 'card' : 'swish',
                  country: t('checkout.countriesSelect.sweden'),
                });
              }}
            />
            {formState.pickup === 'ship' && (
              <>
                <p className={styles.shipToHeading}>
                  {t('checkout.shipToHeading')}:
                </p>
                <Select
                  className={styles.countrySelect}
                  label={t('checkout.form.countries.sweden')}
                  options={countrySelectValues}
                  defaultValue={t('checkout.countriesSelect.sweden')}
                  onChange={(e) => {
                    setFormState({ ...formState, country: e });
                  }}
                  ref={configRefs.country}
                />
              </>
            )}
            <p className={styles.shipToHeading}>
              {t('checkout.paymentViaHeading')}:
            </p>
            <Radio
              options={
                formState.pickup === 'ship'
                  ? paymentOptions.slice(0, 1)
                  : paymentOptions
              }
              selectedOption={formState.payment}
              onOptionChange={(e) => {
                setFormState({
                  ...formState,
                  payment: e,
                });
              }}
            />
          </div>
          <h3 className={styles.productsHeading}>Products</h3>
          <ul className={styles.orderList}>
            {shoppingCart?.map((orderItem) => (
              <CartItem
                key={orderItem.productId}
                item={orderItem}
                onRemove={removeFromCart}
                isOrderItem={true}
              />
            ))}
          </ul>
          <div className={styles.checkoutTotal}>
            {/* <p>{t('shoppingCart.total')}:</p> */}
            <p>{t('checkout.shippingLabel')}:</p>
            {shippingCost !== null && (
              <p>{`${formatPrice(shippingCost)} ${t(
                'misc.currencies.sek',
              )}`}</p>
            )}
          </div>
          <div className={styles.checkoutTotal}>
            <p>{t('shoppingCart.total')}:</p>
            {cartTotal !== null && (
              <p>{`${formatPrice(cartTotal)} ${t('misc.currencies.sek')}`}</p>
            )}
          </div>
          <Button type="submit" className={styles.orderButton} isFullWidth>
            {t('checkout.placeOrderButton')}
          </Button>
        </>
      ) : (
        <div className={styles.cartEmpty}>
          <CartEmptyIcon className={styles.cartEmptyIcon} />
          <h2 className={styles.cartEmptyHeading}>{t('shoppingCart.empty')}</h2>
          <p>{t('checkout.cartEmpty')}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsForm;
