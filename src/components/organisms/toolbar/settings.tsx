import Checkbox, { type CheckboxProps } from '@components/atoms/forms/checkbox';
import Label from '@components/atoms/forms/label';
import Cog from '@components/atoms/icons/cog';
import { FC, forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import SettingsModal, {
  type SettingsModalProps,
} from '../modals/settings-modal';
import settingsStyles from './settings.module.scss';
import sharedStyles from './toolbar-items.module.scss';

export type SettingsProps = {
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
  /**
   * Set additional classnames to the tooltip wrapper.
   */
  tooltipClassName?: SettingsModalProps['tooltipClassName'];
};

const Settings: ForwardRefRenderFunction<HTMLDivElement, SettingsProps> = (
  { className = '', isActive, setIsActive, tooltipClassName = '' },
  ref
) => {
  const intl = useIntl();
  const label = isActive
    ? intl.formatMessage({
        defaultMessage: 'Close settings',
        id: '+viX9b',
        description: 'Settings: Close label',
      })
    : intl.formatMessage({
        defaultMessage: 'Open settings',
        id: 'QCW3cy',
        description: 'Settings: Open label',
      });

  return (
    <div className={`${sharedStyles.item} ${settingsStyles.item}`} ref={ref}>
      <Checkbox
        id="settings-button"
        name="settings-button"
        value={isActive}
        setValue={setIsActive}
        className={`${sharedStyles.checkbox} ${settingsStyles.checkbox}`}
      />
      <Label
        htmlFor="settings-button"
        aria-label={label}
        className={`${sharedStyles.label} ${settingsStyles.label}`}
      >
        <Cog />
      </Label>
      <SettingsModal
        className={`${sharedStyles.modal} ${settingsStyles.modal} ${className}`}
        tooltipClassName={tooltipClassName}
      />
    </div>
  );
};

export default forwardRef(Settings);
