import { useTranslation } from 'react-i18next';

import {
  type FormState,
  type FormErrors,
  type InputProps,
  type OrderDetailsRefs,
} from '@interfaces/interfaces';

import Input from '@components/Inputs/Input/Input';
import ErrorMessages from '@pages/Contact/ContactForm/ErrorMessages';

import styles from '../Checkout.module.scss';

interface PersonalDetailsFormProps {
  configRefs: OrderDetailsRefs;
  formState: FormState;
  handleChange: (e: any) => void;
  errors: FormErrors<FormState>;
}

const PersonalDetailsForm = ({
  configRefs,
  formState,
  handleChange,
  errors,
}: PersonalDetailsFormProps): JSX.Element => {
  const { t } = useTranslation();

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

  return (
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
                { inputRef, inputValue, propertyName, placeholder }: InputProps,
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
              { inputRef, inputValue, propertyName, placeholder }: InputProps,
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
  );
};

export default PersonalDetailsForm;
