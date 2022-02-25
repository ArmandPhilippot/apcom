import styles from './FormItem.module.scss';

const FormItem: React.FunctionComponent = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default FormItem;
