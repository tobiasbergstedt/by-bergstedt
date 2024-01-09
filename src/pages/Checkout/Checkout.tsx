import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import {
  type InputProps,
  type OrderDetailsRefs,
  type OrderDetails,
} from '@interfaces/interfaces';
import { getCartTotal, removeFromCart } from '@utils/cart';

import useFormState from '@hooks/useFormState';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import Input from '@components/Inputs/Input/Input';
import Button from '@components/Button/Button';
import CartItem from '@components/CartItem/CartItem';
import ErrorMessages from '@pages/Contact/ContactForm/ErrorMessages';

import { ReactComponent as CartEmptyIcon } from '@assets/icons/checkout-fail.svg';

import styles from './Checkout.module.scss';
import Modal from '@components/Modal/Modal';
import { sendConfirmationData } from './SendConfirmationForm';
import fixUrl from '@utils/fix-url';

const Checkout = (): JSX.Element => {
  const { shoppingCart } = useContext(UserContext);
  const personalDetailsInitial = {
    surname: '',
    lastName: '',
    companyName: '',
    streetName: '',
    areaCode: '',
    cityName: '',
    phoneNumber: '',
    email: '',
    message: '',
  };

  const optionalFields: Array<keyof OrderDetails> = ['companyName', 'message'];
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

  const { formState, handleChange, validate, errors } = useFormState(
    personalDetailsInitial,
    optionalFields,
  );

  const { t } = useTranslation();

  const configRefs: OrderDetailsRefs = {
    surname: useRef(null),
    lastName: useRef(null),
    companyName: useRef(null),
    streetName: useRef(null),
    areaCode: useRef(null),
    cityName: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
    message: useRef(null),
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

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    // if (validate()) {
    await sendConfirmationData(
      formState,
      shoppingCart,
      'info@tobiasbergstedt.se',
      fixUrl('/api/contacts/send'),
    );
    //   if (checkoutSuccessful) {
    //     navigate('/confirmation');
    //   }
    // } else {
    //   setIsErrorModalVisible(true);
    // }
  };

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
                        inputRef={inputRef}
                        inputValue={inputValue}
                        onChange={handleChange}
                        name={propertyName}
                        // onFocus={}
                        // onBlur={}
                        // onKeyDown={}
                        // maxLength={1}
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
                      inputRef={inputRef}
                      inputValue={inputValue}
                      onChange={handleChange}
                      name={propertyName}
                      // onFocus={}
                      // onBlur={}
                      // onKeyDown={}
                      // maxLength={1}
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
                <ul className={styles.orderList}>
                  {shoppingCart?.map((orderItem) => (
                    <CartItem
                      key={orderItem.id}
                      item={orderItem}
                      onRemove={removeFromCart}
                      isOrderItem={true}
                    />
                  ))}
                </ul>
                <div className={styles.checkoutTotal}>
                  <p>{t('shoppingCart.total')}:</p>
                  <p>{getCartTotal(shoppingCart, t('misc.currencies.sek'))}</p>
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
      {isErrorModalVisible && (
        <Modal
          onClick={() => {
            setIsErrorModalVisible(false);
          }}
        >
          <p>Hej</p>
        </Modal>
      )}
    </>
  );
};

export default Checkout;
