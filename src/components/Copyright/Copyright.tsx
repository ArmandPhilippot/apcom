import { CopyrightIcon } from '@components/Icons';
import { settings } from '@utils/config';
import styles from './Copyright.module.scss';

const Copyright = () => {
  return (
    <p className={styles.wrapper}>
      <span>{settings.name}</span>
      <CopyrightIcon />
      <span>
        {settings.copyright.startYear} - {settings.copyright.endYear}
      </span>
    </p>
  );
};

export default Copyright;
