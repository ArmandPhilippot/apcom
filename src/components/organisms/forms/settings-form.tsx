import Form from '@components/atoms/forms/form';
import AckeeToggle, {
  type AckeeToggleProps,
} from '@components/molecules/forms/ackee-toggle';
import MotionToggle, {
  type MotionToggleProps,
} from '@components/molecules/forms/motion-toggle';
import PrismThemeToggle from '@components/molecules/forms/prism-theme-toggle';
import ThemeToggle from '@components/molecules/forms/theme-toggle';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import styles from './settings-form.module.scss';

export type SettingsFormProps = Pick<AckeeToggleProps, 'tooltipClassName'> & {
  /**
   * The local storage key for Ackee settings.
   */
  ackeeStorageKey: AckeeToggleProps['storageKey'];
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
      className={styles.wrapper}
      itemsClassName={styles.items}
      onSubmit={() => null}
    >
      <ThemeToggle
        bodyClassName={styles.fieldset__body}
        groupClassName={styles.group}
        legendClassName={styles.label}
      />
      <PrismThemeToggle
        bodyClassName={styles.fieldset__body}
        groupClassName={styles.group}
        legendClassName={styles.label}
      />
      <MotionToggle
        defaultValue="on"
        bodyClassName={styles.fieldset__body}
        groupClassName={styles.group}
        legendClassName={styles.label}
        storageKey={motionStorageKey}
      />
      <AckeeToggle
        defaultValue="full"
        bodyClassName={styles.fieldset__body}
        groupClassName={`${styles.group} ${styles['group--ackee']}`}
        legendClassName={`${styles.label} ${styles['label--ackee']}`}
        storageKey={ackeeStorageKey}
        tooltipClassName={`${styles.tooltip} ${tooltipClassName}`}
      />
    </Form>
  );
};

export default SettingsForm;
