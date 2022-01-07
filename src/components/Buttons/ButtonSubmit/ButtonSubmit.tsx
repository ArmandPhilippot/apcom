import { ReactNode } from 'react';
import styles from '../Buttons.module.scss';

type Modifier = 'search' | 'submit';

const ButtonSubmit = ({
  children,
  modifier = 'submit',
}: {
  children: ReactNode;
  modifier?: Modifier;
}) => {
  const withModifier = modifier === 'search' ? styles.search : styles.primary;

  return (
    <button type="submit" className={`${styles.btn} ${withModifier}`}>
      {children}
    </button>
  );
};

export default ButtonSubmit;
