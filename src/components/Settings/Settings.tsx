import { CogIcon } from '@components/Icons';
import ThemeToggle from '@components/Settings/ThemeToggle/ThemeToggle';
import { t } from '@lingui/macro';
import ReduceMotion from './ReduceMotion/ReduceMotion';
import styles from './Settings.module.scss';

const Settings = () => {
  return (
    <>
      <div className={styles.title}>
        <CogIcon /> {t`Settings`}
      </div>
      <ThemeToggle />
      <ReduceMotion />
    </>
  );
};

export default Settings;
