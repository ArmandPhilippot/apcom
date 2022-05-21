import Checkbox, { type CheckboxProps } from '@components/atoms/forms/checkbox';
import Label from '@components/atoms/forms/label';
import Cog from '@components/atoms/icons/cog';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import SettingsModal, {
  type SettingsModalProps,
} from '../modals/settings-modal';
import settingsStyles from './settings.module.scss';
import sharedStyles from './toolbar-items.module.scss';

export type SettingsProps = SettingsModalProps & {
  /**
   * The button state.
   */
  isActive: CheckboxProps['value'];
  /**
   * A callback function to handle button state.
   */
  setIsActive: CheckboxProps['setValue'];
};

const Settings: ForwardRefRenderFunction<HTMLDivElement, SettingsProps> = (
  {
    ackeeStorageKey,
    className = '',
    isActive,
    motionStorageKey,
    setIsActive,
    tooltipClassName = '',
  },
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
        ackeeStorageKey={ackeeStorageKey}
        className={`${sharedStyles.modal} ${settingsStyles.modal} ${className}`}
        motionStorageKey={motionStorageKey}
        tooltipClassName={tooltipClassName}
      />
    </div>
  );
};

export default forwardRef(Settings);
