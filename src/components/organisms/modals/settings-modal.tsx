import { useCallback, type FC, type FormEvent } from 'react';
import { useIntl } from 'react-intl';
import { Heading, Icon } from '../../atoms';
import { Modal, type ModalProps } from '../../molecules';
import { SettingsForm } from '../forms';
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
      icon={<Icon className={styles.icon} shape="cog" />}
      heading={
        <Heading isFake level={3}>
          {title}
        </Heading>
      }
    >
      <SettingsForm aria-label={ariaLabel} onSubmit={submitHandler} />
    </Modal>
  );
};
