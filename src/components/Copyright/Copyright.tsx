import CopyrightIcon from '@assets/images/cc-by-sa.svg';
import { config } from '@config/website';
import styles from './Copyright.module.scss';

const Copyright = () => {
  return (
    <p className={styles.wrapper}>
      <span>{config.name}</span>
      <CopyrightIcon className={styles.icon} />
      <span>
        {config.copyright.startYear} - {config.copyright.endYear}
      </span>
    </p>
  );
};

export default Copyright;
