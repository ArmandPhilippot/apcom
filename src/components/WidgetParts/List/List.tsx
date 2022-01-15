import styles from './List.module.scss';

const List = ({ items }: { items: Array<any> }) => {
  return <ul className={styles.list}>{items}</ul>;
};

export default List;
