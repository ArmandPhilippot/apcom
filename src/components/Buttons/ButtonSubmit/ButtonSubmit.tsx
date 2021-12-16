import styles from '../Buttons.module.scss';

const ButtonSubmit: React.FunctionComponent = ({ children }) => {
  return (
    <button type="submit" className={`${styles.btn} ${styles.submit}`}>
      {children}
    </button>
  );
};

export default ButtonSubmit;
