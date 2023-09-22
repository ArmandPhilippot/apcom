import { forwardRef, ForwardRefRenderFunction, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useInputAutofocus } from '../../../utils/hooks';
import {
  BooleanField,
  type BooleanFieldProps,
  MagnifyingGlass,
} from '../../atoms';
import { FlippingLabel } from '../../molecules';
import { SearchModal, type SearchModalProps } from '../modals';
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
  isActive: BooleanFieldProps['isChecked'];
  /**
   * A callback function to execute search.
   */
  searchPage: SearchModalProps['searchPage'];
  /**
   * A callback function to handle button state.
   */
  setIsActive: BooleanFieldProps['onChange'];
};

const SearchWithRef: ForwardRefRenderFunction<HTMLDivElement, SearchProps> = (
  { className = '', isActive = false, searchPage, setIsActive },
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

  const searchInputRef = useRef<HTMLInputElement>(null);
  useInputAutofocus({
    condition: isActive,
    delay: 360,
    ref: searchInputRef,
  });

  return (
    <div className={`${sharedStyles.item} ${searchStyles.item}`} ref={ref}>
      <BooleanField
        className={`${sharedStyles.checkbox} ${searchStyles.checkbox}`}
        id="search-button"
        isChecked={isActive}
        name="search-button"
        onChange={setIsActive}
        type="checkbox"
        value="open"
      />
      <FlippingLabel
        aria-label={label}
        className={sharedStyles.label}
        htmlFor="search-button"
        isActive={isActive}
      >
        <MagnifyingGlass aria-hidden={true} />
      </FlippingLabel>
      <SearchModal
        className={`${sharedStyles.modal} ${searchStyles.modal} ${className}`}
        ref={searchInputRef}
        searchPage={searchPage}
      />
    </div>
  );
};

export const Search = forwardRef(SearchWithRef);
