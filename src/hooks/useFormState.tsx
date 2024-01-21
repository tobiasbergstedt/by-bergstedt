import { type FormErrors } from '@interfaces/interfaces';
import { type Dispatch, type SetStateAction, useState } from 'react';

interface FormProps<T> {
  formState: T;
  setFormState: Dispatch<SetStateAction<T>>;
  handleChange: (e: any) => void;
  validate: () => boolean;
  errors: FormErrors<T>;
  resetForm: () => void;
}

const useFormState = <T extends Record<string, unknown>>(
  initialState: T,
  optionalFields: Array<keyof T> = [],
): FormProps<T> => {
  const [formState, setFormState] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors<T>>(
    initializeErrorState(initialState),
  );

  function initializeErrorState(state: T): FormErrors<T> {
    const initialErrors: Partial<FormErrors<T>> = {};
    Object.keys(state).forEach((key) => {
      initialErrors[key as keyof T] = '';
    });
    return initialErrors as FormErrors<T>;
  }

  const handleChange = (e: any): void => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const validate = (): boolean => {
    let isValid = true;
    const tempErrors: FormErrors<T> = initializeErrorState(formState);

    Object.keys(formState).forEach((key) => {
      const value = formState[key as keyof T];

      if (
        optionalFields.includes(key as keyof T) &&
        (value === '' || value === undefined || value === null)
      ) {
        return;
      }

      if (value === '' || value === undefined || value === null) {
        tempErrors[key as keyof T] = `errorMessages.${key}Required`;
        isValid = false;
      } else if (key === 'email') {
        if (typeof value === 'string' && !/\S+@\S+\.\S+/.test(value)) {
          tempErrors[key as keyof T] = 'errorMessages.emailInvalid';
          isValid = false;
        }
      } else if (key === 'honeypot') {
        tempErrors[key as keyof T] = 'errorMessages.honeypot';
        isValid = false;
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  const resetForm = (): void => {
    setFormState(initialState);
    setErrors(initialState as any);
  };

  return { formState, setFormState, handleChange, validate, errors, resetForm };
};

export default useFormState;
