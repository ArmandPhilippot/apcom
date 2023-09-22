import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { Heading, Modal, type ModalProps } from '../../atoms';
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
    <Modal
      className={`${styles.wrapper} ${className}`}
      heading={
        <Heading isFake level={3}>
          {modalTitle}
        </Heading>
      }
    >
      <SearchForm isLabelHidden ref={ref} searchPage={searchPage} />
    </Modal>
  );
};

/**
 * SearchModal
 *
 * Render a search form modal.
 */
export const SearchModal = forwardRef(SearchModalWithRef);
