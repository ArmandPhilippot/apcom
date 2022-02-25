import { ChangeEvent, ReactElement, SetStateAction } from 'react';
import styles from '../Form.module.scss';

const TextArea = ({
  id,
  name,
  value,
  setValue,
  label,
}: {
  id: string;
  name: string;
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  label?: ReactElement;
}) => {
  const updateValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {label}
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
