import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { useAutofocus } from '../../../utils/hooks';
import { BooleanField, type BooleanFieldProps, Icon } from '../../atoms';
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

  const searchInputRef = useAutofocus<HTMLInputElement>({
    condition: () => isActive,
    delay: 360,
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
        className={sharedStyles.label}
        htmlFor="search-button"
        icon={<Icon aria-hidden={true} shape="magnifying-glass" size="lg" />}
        isActive={isActive}
        label={label}
      />
      <SearchModal
        className={`${sharedStyles.modal} ${searchStyles.modal} ${className}`}
        ref={searchInputRef}
        searchPage={searchPage}
      />
    </div>
  );
};

export const Search = forwardRef(SearchWithRef);
