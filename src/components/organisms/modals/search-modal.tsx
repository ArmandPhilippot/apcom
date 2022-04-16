import Modal, { type ModalProps } from '@components/molecules/modals/modal';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import SearchForm from '../forms/search-form';
import styles from './search-modal.module.scss';

export type SearchModalProps = {
  /**
   * Set additional classnames to modal wrapper.
   */
  className?: ModalProps['className'];
};

/**
 * SearchModal
 *
 * Render a search form modal.
 */
const SearchModal: FC<SearchModalProps> = ({ className }) => {
  const intl = useIntl();
  const modalTitle = intl.formatMessage({
    defaultMessage: 'Search',
    description: 'SearchModal: modal title',
    id: 'G+Twgm',
  });

  return (
    <Modal title={modalTitle} className={`${styles.wrapper} ${className}`}>
      <SearchForm hideLabel={true} />
    </Modal>
  );
};

export default SearchModal;
