import { CogIcon } from '@components/Icons';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { t } from '@lingui/macro';
import styles from './Settings.module.scss';

const Settings = () => {
  return (
    <>
      <div className={styles.title}>
        <CogIcon /> {t`Settings`}
      </div>
      <ThemeToggle />
    </>
  );
};

export default Settings;
