import Input from '@components/Inputs/Input/Input';
import { type RefObject } from 'react';

interface Props {
  inputRef: RefObject<HTMLInputElement>;
  inputValue: number | string | null;
  handleChange: () => void;
  propertyName: string;
  placeholder: string;
}

const FormInput = ({
  inputRef,
  inputValue,
  handleChange,
  propertyName,
  placeholder,
}: Props): JSX.Element => (
  <Input
    type="text"
    ref={inputRef}
    inputValue={inputValue}
    onChange={handleChange}
    name={propertyName}
    placeholder={placeholder}
    isFullWidth
  />
);

export default FormInput;
