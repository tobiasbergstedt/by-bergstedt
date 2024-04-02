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
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors<FormState>;
}

const PersonalDetailsForm = ({
  configRefs,
  formState,
  handleChange,
  errors,
}: PersonalDetailsFormProps): JSX.Element => {
  const { t } = useTranslation();

  const inputFields: Array<keyof FormState> = [
    'surname',
    'lastName',
    'companyName',
    'streetName',
    'areaCode',
    'cityName',
    'countryName',
    'phoneNumber',
    'email',
    'message',
  ];

  const detailsInputs = inputFields.map((field) => ({
    inputRef: configRefs[field],
    inputValue: formState[field],
    propertyName: field,
    placeholder: t(`checkout.form.${field}`),
  }));

  const renderInput = (
    { inputRef, inputValue, propertyName, placeholder }: InputProps,
    index: number,
  ): JSX.Element => (
    <Input
      type="text"
      ref={inputRef}
      inputValue={inputValue}
      onChange={handleChange}
      name={propertyName}
      placeholder={placeholder}
      key={propertyName}
      isFullWidth
    />
  );

  return (
    <div className={styles.personalDetails}>
      <h2 className={styles.personalDetailsHeading}>
        {t('checkout.personalDetailsHeading')}
      </h2>
      <div className={styles.inputsContainer}>
        <div className={styles.nameInputsContainer}>
          {detailsInputs.slice(0, 2).map(renderInput)}
        </div>
        {detailsInputs.slice(2).map(renderInput)}
        <ErrorMessages errors={errors} />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
