import styles from './Hamburger.module.scss';

const HamburgerIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <span
      className={`${styles.icon}${
        isActive ? ` ${styles['icon--active']}` : ''
      }`}
    ></span>
  );
};

export default HamburgerIcon;
