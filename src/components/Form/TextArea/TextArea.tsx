import { ChangeEvent, SetStateAction } from 'react';
import styles from '../Form.module.scss';

const TextArea = ({
  id,
  name,
  value,
  setValue,
  required = false,
  label,
}: {
  id: string;
  name: string;
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  required?: boolean;
  label?: string;
}) => {
  const updateValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={updateValue}
        className={`${styles.field} ${styles.textarea}`}
      />
    </>
  );
};

export default TextArea;
