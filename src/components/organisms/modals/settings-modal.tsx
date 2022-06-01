import Spinner from '@components/atoms/loaders/spinner';
import Modal, { type ModalProps } from '@components/molecules/modals/modal';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { type SettingsFormProps } from '../forms/settings-form';
import styles from './settings-modal.module.scss';

const DynamicSettingsForm = dynamic(
  () => import('@components/organisms/forms/settings-form'),
  {
    loading: () => <Spinner />,
    ssr: false,
  }
);

export type SettingsModalProps = Pick<ModalProps, 'className'> &
  Pick<
    SettingsFormProps,
    'ackeeStorageKey' | 'motionStorageKey' | 'tooltipClassName'
  >;

/**
 * SettingsModal component
 *
 * Render a modal with settings options.
 */
const SettingsModal: FC<SettingsModalProps> = ({
  className = '',
  ...props
}) => {
  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Settings',
    description: 'SettingsModal: title',
    id: 'gPfT/K',
  });

  return (
    <Modal title={title} icon="cogs" className={className}>
      <DynamicSettingsForm {...props} />
    </Modal>
  );
};

export default SettingsModal;
