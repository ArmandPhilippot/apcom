import Checkbox, { type CheckboxProps } from '@components/atoms/forms/checkbox';
import Label from '@components/atoms/forms/label';
import MagnifyingGlass from '@components/atoms/icons/magnifying-glass';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import SearchModal, { type SearchModalProps } from '../modals/search-modal';
import searchStyles from './search.module.scss';
import sharedStyles from './toolbar-items.module.scss';

export type SearchProps = {
  /**
   * Set additional classnames to the modal wrapper.
   */
  className?: SearchModalProps['className'];
  /**
   * The button state.
   */
  isActive: CheckboxProps['value'];
  /**
   * A callback function to execute search.
   */
  searchPage: SearchModalProps['searchPage'];
  /**
   * A callback function to handle button state.
   */
  setIsActive: CheckboxProps['setValue'];
};

const Search: ForwardRefRenderFunction<HTMLDivElement, SearchProps> = (
  { className = '', isActive, searchPage, setIsActive },
  ref
) => {
  const intl = useIntl();
  const label = isActive
    ? intl.formatMessage({
        defaultMessage: 'Close search',
        id: 'LDDUNO',
        description: 'Search: Close label',
      })
    : intl.formatMessage({
        defaultMessage: 'Open search',
        id: 'Xj+WXB',
        description: 'Search: Open label',
      });

  return (
    <div className={`${sharedStyles.item} ${searchStyles.item}`} ref={ref}>
      <Checkbox
        id="search-button"
        name="search-button"
        value={isActive}
        setValue={setIsActive}
        className={`${sharedStyles.checkbox} ${searchStyles.checkbox}`}
      />
      <Label
        htmlFor="search-button"
        aria-label={label}
        className={`${sharedStyles.label} ${searchStyles.label}`}
      >
        <MagnifyingGlass />
      </Label>
      <SearchModal
        searchPage={searchPage}
        className={`${sharedStyles.modal} ${searchStyles.modal} ${className}`}
      />
    </div>
  );
};

export default forwardRef(Search);
