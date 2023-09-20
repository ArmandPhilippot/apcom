import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { Modal, type ModalProps } from '../../molecules';
import { SearchForm, type SearchFormProps } from '../forms';
import styles from './search-modal.module.scss';

export type SearchModalProps = SearchFormProps & {
  /**
   * Set additional classnames to modal wrapper.
   */
  className?: ModalProps['className'];
};

const SearchModalWithRef: ForwardRefRenderFunction<
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
    <Modal className={`${styles.wrapper} ${className}`} title={modalTitle}>
      <SearchForm hideLabel={true} ref={ref} searchPage={searchPage} />
    </Modal>
  );
};

/**
 * SearchModal
 *
 * Render a search form modal.
 */
export const SearchModal = forwardRef(SearchModalWithRef);
