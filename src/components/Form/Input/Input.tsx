import { ChangeEvent, ForwardedRef, forwardRef, SetStateAction } from 'react';
import styles from '../Form.module.scss';

type InputType = 'text' | 'email' | 'number' | 'search';

const Input = (
  {
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
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <input
        ref={ref}
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

export default forwardRef(Input);
