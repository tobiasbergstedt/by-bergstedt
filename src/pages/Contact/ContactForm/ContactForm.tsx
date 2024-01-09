import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@components/Inputs/Input/Input';

import useFormState from '@hooks/useFormState';
import fixUrl from '@utils/fix-url';

import { ReactComponent as SuccessIcon } from '@assets/icons/message-sent.svg';
import { ReactComponent as FailIcon } from '@assets/icons/message-failed.svg';
import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import { sendContactData } from './SendContactForm';
import ErrorMessages from './ErrorMessages';

import styles from './ContactForm.module.scss';
import { type ContactFormData } from '@interfaces/interfaces';

interface ContactProps {
  mailTo: string;
}

const ContactForm = ({ mailTo }: ContactProps): JSX.Element => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const formInitialState = {
    name: '',
    email: '',
    message: '',
    honeypot: '',
  };
  const optionalFields: Array<keyof ContactFormData> = ['honeypot'];

  const { formState, handleChange, validate, errors, resetForm } = useFormState(
    formInitialState,
    optionalFields,
  );

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { t } = useTranslation();

  const submitForm = async (): Promise<void> => {
    try {
      await sendContactData(formState, mailTo, fixUrl('/api/contacts/send'));
      setSuccessMessage(t('contact.sentSuccessfully'));
      setHasSubmitted(true);
      setShowModal(true);
      resetForm();
      setHasSubmitted(false);
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage(t('contact.failedToSend'));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isFormValid = validate();

    if (isFormValid) {
      void submitForm();
    } else {
      console.log('Form failed to submit.');
    }
  };

  useEffect(() => {
    if (hasSubmitted) {
      validate();
    }
  }, [formState]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="honeypot"
        value={formState.honeypot}
        onChange={handleChange}
        // style={{ display: 'none' }}
        className={styles.honeypot}
      />
      <h3 className={styles.formHeading}>{t('contact.form.getInTouch')}</h3>
      <Input
        isFullWidth
        type="text"
        name={'name'}
        inputValue={formState.name}
        onChange={handleChange}
        placeholder={t('contact.form.yourName')}
      />
      <Input
        isFullWidth
        type="text"
        name={'email'}
        inputValue={formState.email}
        onChange={handleChange}
        placeholder={t('contact.form.yourEmail')}
      />
      <textarea
        name="message"
        value={formState.message}
        onChange={handleChange}
        placeholder={t('contact.form.yourMessage')}
        className={styles.textArea}
      />
      <Button type="submit">{t('contact.form.send')}</Button>
      <ErrorMessages errors={errors} />
      {showModal && (
        <Modal
          hasCloseButton
          canClose
          onClick={() => {
            setShowModal(false);
            setSuccessMessage('');
            setErrorMessage('');
          }}
        >
          <>
            {successMessage.length !== 0 && (
              <>
                <SuccessIcon className={styles.successIcon} />
                <p className={styles.messageParagraph}>{successMessage}</p>
              </>
            )}
            {errorMessage.length !== 0 && (
              <>
                <FailIcon className={styles.failIcon} />
                <p className={styles.messageParagraph}>{errorMessage}</p>
              </>
            )}
          </>
        </Modal>
      )}
    </form>
  );
};

export default ContactForm;
