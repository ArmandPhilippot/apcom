import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  SetStateAction,
} from 'react';
import styles from '../Form.module.scss';

type InputType = 'text' | 'email' | 'number' | 'search';

const Input = (
  {
    id,
    name,
    value,
    setValue,
    type = 'text',
    label,
  }: {
    id: string;
    name: string;
    value: string;
    setValue: (value: SetStateAction<string>) => void;
    type?: InputType;
    label?: ReactElement;
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {label}
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
