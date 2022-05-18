import Spinner from '@components/atoms/loaders/spinner';
import Modal, { type ModalProps } from '@components/molecules/modals/modal';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { type SearchFormProps } from '../forms/search-form';
import styles from './search-modal.module.scss';

const DynamicSearchForm = dynamic(
  () => import('@components/organisms/forms/search-form'),
  {
    loading: () => <Spinner />,
    ssr: false,
  }
);

export type SearchModalProps = Pick<SearchFormProps, 'searchPage'> & {
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
const SearchModal: FC<SearchModalProps> = ({ className, searchPage }) => {
  const intl = useIntl();
  const modalTitle = intl.formatMessage({
    defaultMessage: 'Search',
    description: 'SearchModal: modal title',
    id: 'G+Twgm',
  });

  return (
    <Modal title={modalTitle} className={`${styles.wrapper} ${className}`}>
      <DynamicSearchForm hideLabel={true} searchPage={searchPage} />
    </Modal>
  );
};

export default SearchModal;
