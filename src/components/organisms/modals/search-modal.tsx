import Modal, { type ModalProps } from '@components/molecules/modals/modal';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import SearchForm, { type SearchFormProps } from '../forms/search-form';
import styles from './search-modal.module.scss';

export type SearchModalProps = SearchFormProps & {
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
const SearchModal: ForwardRefRenderFunction<
  HTMLInputElement,
  SearchModalProps
> = ({ className, searchPage }, ref) => {
  const intl = useIntl();
  const modalTitle = intl.formatMessage({
    defaultMessage: 'Search',
    description: 'SearchModal: modal title',
    id: 'G+Twgm',
  });

  return (
    <Modal title={modalTitle} className={`${styles.wrapper} ${className}`}>
      <SearchForm hideLabel={true} ref={ref} searchPage={searchPage} />
    </Modal>
  );
};

export default forwardRef(SearchModal);
