import { useRef, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import {
  type InputProps,
  type OrderDetailsRefs,
  type OrderDetails,
  type RadioOption,
} from '@interfaces/interfaces';
import {
  getCartSum,
  getCartTotal,
  getShipping,
  removeFromCart,
} from '@utils/cart';

import useFormState from '@hooks/useFormState';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import Input from '@components/Inputs/Input/Input';
import Button from '@components/Button/Button';
import CartItem from '@components/CartItem/CartItem';
import ErrorMessages from '@pages/Contact/ContactForm/ErrorMessages';

import { ReactComponent as CartEmptyIcon } from '@assets/icons/checkout-fail.svg';

import styles from './Checkout.module.scss';
import { sendConfirmationData } from './SendConfirmationForm';
import Select from '@components/Inputs/Select/Select';
import formatPrice from '@utils/format-price';
import Radio from '@components/Inputs/Radio/Radio';
import { postData, updateObjectAmount } from '@utils/api';
import { generateUUID } from '@utils/uuid';

const Checkout = (): JSX.Element => {
  const { locale, shoppingCart, setShoppingCart, shippingRates } =
    useContext(UserContext);
  const personalDetailsInitial = {
    surname: '',
    lastName: '',
    companyName: '',
    streetName: '',
    areaCode: '',
    cityName: '',
    countryName: '',
    phoneNumber: '',
    email: '',
    message: '',
    country: '',
    pickup: 'pickup',
    payment: 'swish',
  };

  const [shippingCost, setShippingCost] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const optionalFields: Array<keyof OrderDetails> = [
    'companyName',
    'message',
    'country',
  ];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiSuccess, setApiSuccess] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const { formState, setFormState, handleChange, validate, errors } =
    useFormState(personalDetailsInitial, optionalFields);

  const { t } = useTranslation();

  const configRefs: OrderDetailsRefs = {
    surname: useRef(null),
    lastName: useRef(null),
    companyName: useRef(null),
    streetName: useRef(null),
    areaCode: useRef(null),
    cityName: useRef(null),
    countryName: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
    message: useRef(null),
    country: useRef(null),
    pickup: useRef(null),
    payment: useRef(null),
  };

  const companyName = 'companyName';

  const detailsInputs = [
    {
      inputRef: configRefs.surname,
      inputValue: formState.surname,
      propertyName: 'surname',
      placeholder: t('checkout.form.firstName'),
    },
    {
      inputRef: configRefs.lastName,
      inputValue: formState.lastName,
      propertyName: 'lastName',
      placeholder: t('checkout.form.lastName'),
    },
    {
      inputRef: configRefs.companyName,
      inputValue: formState.companyName,
      propertyName: companyName,
      placeholder: t('checkout.form.companyName'),
    },
    {
      inputRef: configRefs.streetName,
      inputValue: formState.streetName,
      propertyName: 'streetName',
      placeholder: t('checkout.form.streetName'),
    },
    {
      inputRef: configRefs.areaCode,
      inputValue: formState.areaCode,
      propertyName: 'areaCode',
      placeholder: t('checkout.form.areaCode'),
    },
    {
      inputRef: configRefs.cityName,
      inputValue: formState.cityName,
      propertyName: 'cityName',
      placeholder: t('checkout.form.cityName'),
    },
    {
      inputRef: configRefs.countryName,
      inputValue: formState.countryName,
      propertyName: 'countryName',
      placeholder: t('checkout.form.country'),
    },
    {
      inputRef: configRefs.phoneNumber,
      inputValue: formState.phoneNumber,
      propertyName: 'phoneNumber',
      placeholder: t('checkout.form.phoneNumber'),
    },
    {
      inputRef: configRefs.email,
      inputValue: formState.email,
      propertyName: 'email',
      placeholder: t('checkout.form.email'),
    },
    {
      inputRef: configRefs.message,
      inputValue: formState.message,
      propertyName: 'message',
      placeholder: t('checkout.form.message'),
    },
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

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (validate()) {
      const data = {
        totalSum: cartTotal,
        shipping: shippingCost,
        userData: {
          name: `${formState.surname} ${formState.lastName}`,
          company: formState.companyName,
          address: `${formState.streetName}, ${formState.areaCode}, ${formState.cityName} ${formState.country}`,
          phoneNumber: formState.phoneNumber,
          email: formState.email,
          message: formState.message,
        },
        orderDetails: shoppingCart,
        shippingInfo: formState.pickup,
        paymentMethod: formState.payment,
        orderId: generateUUID(),
      };

      await sendConfirmationData(
        formState,
        shoppingCart,
        data.orderId,
        formatPrice(shippingCost),
        formatPrice(cartTotal),
        '/api/orders/send',
        setApiError,
        locale,
      );

      await postData(
        '/api/orders',
        data,
        setIsLoading,
        setApiSuccess,
        setApiError,
      );

      if (shoppingCart !== null) {
        shoppingCart.map(async (product) => {
          const newAmount =
            product.amountAvailable - product.amount >= 0
              ? product.amountAvailable - product.amount
              : 0;
          await updateObjectAmount(
            `/api/items/${product.strapiId}`,
            newAmount,
            setIsLoading,
            setApiSuccess,
            setApiError,
          );
        });
      }

      setShoppingCart(null);

      navigate(`/orderconfirmation/${data.orderId}`);
    }
  };

  useEffect(() => {
    if (shippingRates !== null) {
      if (formState.pickup === 'pickup') {
        setShippingCost(0);

        const total = getCartSum(shoppingCart);
        setCartTotal(total);
      } else {
        const cost = getShipping(
          shoppingCart,
          shippingRates,
          formState.country,
        );
        setShippingCost(cost);

        const total = getCartTotal(
          shoppingCart,
          shippingRates,
          formState.country,
        );
        setCartTotal(total);
      }
    }
  }, [shippingRates, shoppingCart, formState.country, formState.pickup]);

  return (
    <>
      <SEOHelmet
        title={t('helmet.checkout.title')}
        description={t('helmet.checkout.description')}
      />
      <div className={styles.checkoutContainer}>
        <h1 className={styles.checkoutHeading}>{t('checkout.heading')}</h1>
        <div className={styles.orderInfoContainer}>
          <p className={styles.orderInfo}>{t('checkout.orderInfo1')}</p>
          <p className={styles.orderInfo}>{t('checkout.orderInfo2')}</p>
          <p className={styles.orderInfo}>{t('checkout.orderInfo3')}</p>
        </div>
        <form className={styles.checkoutContent} onSubmit={handleSubmit}>
          <div className={styles.personalDetails}>
            <h2 className={styles.personalDetailsHeading}>
              {t('checkout.personalDetailsHeading')}
            </h2>
            <div className={styles.inputsContainer}>
              <div className={styles.nameInputsContainer}>
                {detailsInputs
                  .slice(0, 2)
                  .map(
                    (
                      {
                        inputRef,
                        inputValue,
                        propertyName,
                        placeholder,
                      }: InputProps,
                      index: number,
                    ) => (
                      <Input
                        type="text"
                        ref={inputRef}
                        inputValue={inputValue}
                        onChange={handleChange}
                        name={propertyName}
                        placeholder={placeholder}
                        key={index}
                        isFullWidth
                      />
                    ),
                  )}
              </div>
              {detailsInputs
                .slice(2, detailsInputs.length)
                .map(
                  (
                    {
                      inputRef,
                      inputValue,
                      propertyName,
                      placeholder,
                    }: InputProps,
                    index: number,
                  ) => (
                    <Input
                      type="text"
                      ref={inputRef}
                      inputValue={inputValue}
                      onChange={handleChange}
                      name={propertyName}
                      placeholder={placeholder}
                      key={index}
                      isFullWidth
                    />
                  ),
                )}
              <ErrorMessages errors={errors} />
            </div>
          </div>
          <div className={styles.orderDetails}>
            {shoppingCart !== null ? (
              <>
                <h2 className={styles.orderHeading}>
                  {t('checkout.orderHeading')}
                </h2>
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
                    <p>{`${formatPrice(cartTotal)} ${t(
                      'misc.currencies.sek',
                    )}`}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className={styles.orderButton}
                  isFullWidth
                >
                  {t('checkout.placeOrderButton')}
                </Button>
              </>
            ) : (
              <div className={styles.cartEmpty}>
                <CartEmptyIcon className={styles.cartEmptyIcon} />
                <h2 className={styles.cartEmptyHeading}>
                  {t('shoppingCart.empty')}
                </h2>
                <p>{t('checkout.cartEmpty')}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
