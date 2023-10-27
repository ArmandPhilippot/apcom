import { useCallback, type FC, type FormEvent } from 'react';
import { useIntl } from 'react-intl';
import { Form, Heading, Icon, Modal, type ModalProps } from '../../atoms';
import {
  AckeeToggle,
  MotionToggle,
  PrismThemeToggle,
  ThemeToggle,
} from '../forms';
import styles from './settings-modal.module.scss';

export type SettingsModalProps = Pick<ModalProps, 'className'>;

/**
 * SettingsModal component
 *
 * Render a modal with settings options.
 */
export const SettingsModal: FC<SettingsModalProps> = ({ className = '' }) => {
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

  const submitHandler = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <Modal
      className={`${styles.wrapper} ${className}`}
      heading={
        <Heading isFake level={3}>
          <Icon className={styles.icon} shape="cog" />
          {title}
        </Heading>
      }
    >
      <Form
        aria-label={ariaLabel}
        className={styles.form}
        onSubmit={submitHandler}
      >
        <ThemeToggle className={styles.item} />
        <PrismThemeToggle className={styles.item} />
        <MotionToggle className={styles.item} />
        <AckeeToggle className={styles.item} direction="upwards" />
      </Form>
    </Modal>
  );
};
