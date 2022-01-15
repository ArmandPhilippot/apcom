import styles from './OrderedList.module.scss';

const OrderedList = ({ items }: { items: Array<any> }) => {
  return <ol className={styles.list}>{items}</ol>;
};

export default OrderedList;
