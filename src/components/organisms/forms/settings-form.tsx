import Form from '@components/atoms/forms/form';
import AckeeSelect, {
  type AckeeSelectProps,
} from '@components/molecules/forms/ackee-select';
import MotionToggle, {
  MotionToggleProps,
} from '@components/molecules/forms/motion-toggle';
import PrismThemeToggle from '@components/molecules/forms/prism-theme-toggle';
import ThemeToggle from '@components/molecules/forms/theme-toggle';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import styles from './settings-form.module.scss';

export type SettingsFormProps = Pick<AckeeSelectProps, 'tooltipClassName'> & {
  /**
   * The local storage key for Ackee settings.
   */
  ackeeStorageKey: AckeeSelectProps['storageKey'];
  /**
   * The local storage key for Reduce motion settings.
   */
  motionStorageKey: MotionToggleProps['storageKey'];
};

const SettingsForm: FC<SettingsFormProps> = ({
  ackeeStorageKey,
  motionStorageKey,
  tooltipClassName,
}) => {
  const intl = useIntl();
  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Settings form',
    id: 'gX+YVy',
    description: 'SettingsForm: an accessible form name',
  });

  return (
    <Form
      aria-label={ariaLabel}
      itemsClassName={styles.items}
      onSubmit={() => null}
    >
      <ThemeToggle className={styles.setting} labelClassName={styles.label} />
      <PrismThemeToggle
        className={styles.setting}
        labelClassName={styles.label}
      />
      <MotionToggle
        className={styles.setting}
        labelClassName={styles.label}
        storageKey={motionStorageKey}
        value={false}
      />
      <AckeeSelect
        className={styles.setting}
        initialValue="full"
        labelClassName={`${styles.label} ${styles['label--select']}`}
        tooltipClassName={tooltipClassName}
        storageKey={ackeeStorageKey}
      />
    </Form>
  );
};

export default SettingsForm;
