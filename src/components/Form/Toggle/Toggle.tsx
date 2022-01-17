import { FormEvent, ReactElement } from 'react';
import { Form } from '..';
import styles from './Toggle.module.scss';

const Toggle = ({
  id,
  label,
  value,
  changeHandler,
  leftChoice,
  rightChoice,
  name,
}: {
  id: string;
  label: string;
  value: boolean;
  changeHandler: (value: boolean) => void;
  leftChoice: ReactElement | string;
  rightChoice: ReactElement | string;
  name?: string;
}) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Form modifier="toggle" submitHandler={onSubmit}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        name={name ? name : id}
        checked={value}
        onChange={() => changeHandler(!value)}
      />
      <label htmlFor={id} className={styles.label}>
        <span className={styles.title}>{label}</span>
        {leftChoice}
        <span className={styles.toggle}></span>
        {rightChoice}
      </label>
    </Form>
  );
};

export default Toggle;
