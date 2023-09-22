import { FC } from 'react';
import { useIntl } from 'react-intl';
import { Cog, Form, Heading, Modal, type ModalProps } from '../../atoms';
import {
  AckeeToggle,
  type AckeeToggleProps,
  MotionToggle,
  type MotionToggleProps,
  PrismThemeToggle,
  ThemeToggle,
} from '../../organisms';
import styles from './settings-modal.module.scss';

export type SettingsModalProps = Pick<ModalProps, 'className'> & {
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
      heading={
        <Heading isFake level={3}>
          <Cog className={styles.icon} />
          {title}
        </Heading>
      }
    >
      <Form
        aria-label={ariaLabel}
        className={styles.form}
        onSubmit={() => null}
      >
        <ThemeToggle className={styles.item} />
        <PrismThemeToggle className={styles.item} />
        <MotionToggle
          className={styles.item}
          defaultValue="on"
          storageKey={motionStorageKey}
        />
        <AckeeToggle
          className={styles.item}
          direction="upwards"
          defaultValue="full"
          storageKey={ackeeStorageKey}
        />
      </Form>
    </Modal>
  );
};
