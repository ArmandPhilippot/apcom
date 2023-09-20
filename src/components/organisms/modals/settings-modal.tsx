import { FC } from 'react';
import { useIntl } from 'react-intl';
import { Form } from '../../atoms';
import {
  AckeeToggle,
  type AckeeToggleProps,
  Modal,
  type ModalProps,
  MotionToggle,
  type MotionToggleProps,
  PrismThemeToggle,
  ThemeToggle,
} from '../../molecules';
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
export const SettingsModal: FC<SettingsModalProps> = ({
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
      className={`${styles.wrapper} ${className}`}
      icon="cogs"
      title={title}
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
          bodyClassName={styles.fieldset__body}
          defaultValue="on"
          groupClassName={styles.group}
          legendClassName={styles.label}
          storageKey={motionStorageKey}
        />
        <AckeeToggle
          bodyClassName={styles.fieldset__body}
          buttonClassName={styles.btn}
          defaultValue="full"
          groupClassName={`${styles.group} ${styles['group--ackee']}`}
          legendClassName={`${styles.label} ${styles['label--ackee']}`}
          storageKey={ackeeStorageKey}
          tooltipClassName={`${styles.tooltip} ${tooltipClassName}`}
        />
      </Form>
    </Modal>
  );
};
