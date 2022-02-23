import { ChangeEvent, ReactElement, SetStateAction } from 'react';
import styles from './Select.module.scss';

type SelectOptions = {
  id: string;
  name: string;
  value: string;
};

const Select = ({
  options,
  id,
  name,
  value,
  setValue,
  required = false,
  label,
}: {
  options: SelectOptions[];
  id: string;
  name: string;
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  required?: boolean;
  label?: ReactElement;
}) => {
  const getOptions = () => {
    return options.map((option) => (
      <option key={option.id} value={option.value}>
        {option.name}
      </option>
    ));
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      {label}
      <select
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        required={required}
        className={styles.wrapper}
      >
        {getOptions()}
      </select>
    </>
  );
};

export default Select;
