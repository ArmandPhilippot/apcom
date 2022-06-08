import BooleanField, {
  type BooleanFieldProps,
} from '@components/atoms/forms/boolean-field';
import Cog from '@components/atoms/icons/cog';
import FlippingLabel from '@components/molecules/forms/flipping-label';
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
  isActive: BooleanFieldProps['checked'];
  /**
   * A callback function to handle button state.
   */
  setIsActive: BooleanFieldProps['onChange'];
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
      <BooleanField
        checked={isActive}
        className={sharedStyles.checkbox}
        id="settings-button"
        name="settings-button"
        onChange={setIsActive}
        type="checkbox"
        value="open"
      />
      <FlippingLabel
        className={sharedStyles.label}
        htmlFor="settings-button"
        aria-label={label}
        isActive={isActive}
      >
        <Cog aria-hidden={true} />
      </FlippingLabel>
      <SettingsModal
        ackeeStorageKey={ackeeStorageKey}
        className={`${sharedStyles.modal} ${className}`}
        motionStorageKey={motionStorageKey}
        tooltipClassName={`${settingsStyles.tooltip} ${tooltipClassName}`}
      />
    </div>
  );
};

export default forwardRef(Settings);
