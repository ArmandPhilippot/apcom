import styles from '../Form.module.scss';

const FormItem: React.FunctionComponent = ({ children }) => {
  return <div className={styles.item}>{children}</div>;
};

export default FormItem;
