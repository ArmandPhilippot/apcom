import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  SetStateAction,
} from 'react';
import styles from './Field.module.scss';

type FieldType = 'email' | 'number' | 'search' | 'select' | 'text' | 'textarea';
type SelectOptions = {
  id: string;
  name: string;
  value: string;
};

const Field = (
  {
    id,
    name,
    value,
    setValue,
    required = false,
    kind = 'text',
    label,
    options,
  }: {
    id: string;
    name: string;
    value: string;
    setValue: (value: SetStateAction<string>) => void;
    required?: boolean;
    kind?: FieldType;
    label?: ReactElement;
    options?: SelectOptions[];
  },
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) => {
  const updateValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValue(e.target.value);
  };

  const getOptions = () => {
    return options
      ? options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))
      : '';
  };

  const getField = () => {
    switch (kind) {
      case 'select':
        return (
          <select
            name={name}
            id={id}
            value={value}
            onChange={updateValue}
            required={required}
            className={`${styles.field} ${styles.select}`}
          >
            {getOptions()}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            id={id}
            name={name}
            value={value}
            required={required}
            onChange={updateValue}
            className={`${styles.field} ${styles.textarea}`}
          />
        );
      default:
        return (
          <input
            ref={ref as ForwardedRef<HTMLInputElement>}
            type={kind}
            id={id}
            name={name}
            value={value}
            required={required}
            onChange={updateValue}
            className={styles.field}
          />
        );
    }
  };

  return (
    <>
      {label}
      {getField()}
    </>
  );
};

export default forwardRef(Field);
