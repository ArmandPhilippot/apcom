import { FC } from 'react';
import { useIntl } from 'react-intl';
import Form from '../../atoms/forms/form';
import AckeeToggle, {
  AckeeToggleProps,
} from '../../molecules/forms/ackee-toggle';
import MotionToggle, {
  MotionToggleProps,
} from '../../molecules/forms/motion-toggle';
import PrismThemeToggle from '../../molecules/forms/prism-theme-toggle';
import ThemeToggle from '../../molecules/forms/theme-toggle';
import Modal, { type ModalProps } from '../../molecules/modals/modal';
import styles from './settings-modal.module.scss';

export type SettingsModalProps = Pick<ModalProps, 'className'> &
  Pick<AckeeToggleProps, 'tooltipClassName'> & {
    /**
     * The local storage key for Ackee settings.
     */
    ackeeStorageKey: AckeeToggleProps['storageKey'];
    /**
     * The local storage key for Reduce motion settings.
     */
    motionStorageKey: MotionToggleProps['storageKey'];
  };

/**
 * SettingsModal component
 *
 * Render a modal with settings options.
 */
const SettingsModal: FC<SettingsModalProps> = ({
  className = '',
  ackeeStorageKey,
  motionStorageKey,
  tooltipClassName,
}) => {
  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Settings',
    description: 'SettingsModal: title',
    id: 'gPfT/K',
  });
  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Settings form',
    id: 'xYNeKX',
    description: 'SettingsModal: an accessible form name',
  });

  return (
    <Modal
      title={title}
      icon="cogs"
      className={`${styles.wrapper} ${className}`}
    >
      <Form
        aria-label={ariaLabel}
        className={styles.form}
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
          buttonClassName={styles.btn}
          groupClassName={`${styles.group} ${styles['group--ackee']}`}
          legendClassName={`${styles.label} ${styles['label--ackee']}`}
          storageKey={ackeeStorageKey}
          tooltipClassName={`${styles.tooltip} ${tooltipClassName}`}
        />
      </Form>
    </Modal>
  );
};

export default SettingsModal;
