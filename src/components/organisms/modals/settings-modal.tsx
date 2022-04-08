import Form from '@components/atoms/forms/form';
import AckeeSelect from '@components/molecules/forms/ackee-select';
import MotionToggle from '@components/molecules/forms/motion-toggle';
import PrismThemeToggle from '@components/molecules/forms/prism-theme-toggle';
import ThemeToggle from '@components/molecules/forms/theme-toggle';
import Modal from '@components/molecules/modals/modal';
import { VFC } from 'react';
import { useIntl } from 'react-intl';
import styles from './settings-modal.module.scss';

export type SettingsModalProps = {
  /**
   * Set additional classnames to modal wrapper.
   */
  className?: string;
};

/**
 * SettingsModal component
 *
 * Render a modal with settings options.
 */
const SettingsModal: VFC<SettingsModalProps> = ({ className }) => {
  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Settings',
    description: 'SettingsModal: title',
    id: 'gPfT/K',
  });

  return (
    <Modal
      title={title}
      icon="cogs"
      className={`${styles.wrapper} ${className}`}
    >
      <Form onSubmit={() => null}>
        <ThemeToggle labelClassName={styles.label} value={false} />
        <PrismThemeToggle labelClassName={styles.label} value={false} />
        <MotionToggle labelClassName={styles.label} value={false} />
        <AckeeSelect
          initialValue="full"
          labelClassName={styles.label}
          tooltipClassName={styles.tooltip}
        />
      </Form>
    </Modal>
  );
};

export default SettingsModal;
