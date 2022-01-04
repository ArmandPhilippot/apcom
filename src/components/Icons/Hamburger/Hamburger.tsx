import styles from './Hamburger.module.scss';

const HamburgerIcon = ({ isActive }: { isActive: boolean }) => {
  const withModifier = isActive ? ` ${styles['icon--active']}` : '';
  const iconClasses = `${styles.icon} ${withModifier}`;

  return <span className={iconClasses}></span>;
};

export default HamburgerIcon;
