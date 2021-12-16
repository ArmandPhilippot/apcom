import { ChangeEvent, SetStateAction } from 'react';
import styles from '../Form.module.scss';

type InputType = 'text' | 'number';

const Input = ({
  id,
  name,
  value,
  setValue,
  type = 'text',
  required = false,
  label,
}: {
  id: string;
  name: string;
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  type?: InputType;
  required?: boolean;
  label?: string;
}) => {
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span> *</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={updateValue}
        className={styles.field}
      />
    </>
  );
};

export default Input;
