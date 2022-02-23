import { CogIcon } from '@components/Icons';
import ThemeToggle from '@components/Settings/ThemeToggle/ThemeToggle';
import { useIntl } from 'react-intl';
import AckeeSelect from './AckeeSelect/AckeeSelect';
import PrismThemeToggle from './PrismThemeToggle/PrismThemeToggle';
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
      <PrismThemeToggle />
      <AckeeSelect />
    </>
  );
};

export default Settings;
