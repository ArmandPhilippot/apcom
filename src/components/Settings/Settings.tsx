import { CogIcon } from '@components/Icons';
import ThemeToggle from '@components/Settings/ThemeToggle/ThemeToggle';
import { useIntl } from 'react-intl';
import ReduceMotion from './ReduceMotion/ReduceMotion';
import styles from './Settings.module.scss';

const Settings = () => {
  const intl = useIntl();

  return (
    <>
      <div className={styles.title}>
        <CogIcon />{' '}
        {intl.formatMessage({
          defaultMessage: 'Settings',
          description: 'Settings: modal title',
        })}
      </div>
      <ThemeToggle />
      <ReduceMotion />
    </>
  );
};

export default Settings;
