import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { BooleanField, type BooleanFieldProps, Cog } from '../../atoms';
import { FlippingLabel } from '../../molecules';
import { SettingsModal, type SettingsModalProps } from '../modals';
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

const SettingsWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  SettingsProps
> = (
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
        aria-label={label}
        className={sharedStyles.label}
        htmlFor="settings-button"
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

export const Settings = forwardRef(SettingsWithRef);
