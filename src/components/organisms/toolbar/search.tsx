import Checkbox, { CheckboxProps } from '@components/atoms/forms/checkbox';
import Label from '@components/atoms/forms/label';
import MagnifyingGlass from '@components/atoms/icons/magnifying-glass';
import { VFC } from 'react';
import { useIntl } from 'react-intl';
import SearchModal from '../modals/search-modal';
import sharedStyles from './toolbar-items.module.scss';
import searchStyles from './search.module.scss';

export type SearchProps = {
  /**
   * Set additional classnames to the modal wrapper.
   */
  className?: string;
  /**
   * The button state.
   */
  isActive: CheckboxProps['value'];
  /**
   * A callback function to handle button state.
   */
  setIsActive: CheckboxProps['setValue'];
};

const Search: VFC<SearchProps> = ({
  className = '',
  isActive,
  setIsActive,
}) => {
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
    <div className={`${sharedStyles.item} ${searchStyles.item}`}>
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
        className={`${sharedStyles.modal} ${searchStyles.modal} ${className}`}
      />
    </div>
  );
};

export default Search;
