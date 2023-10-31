import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { BooleanField, type BooleanFieldProps, Icon } from '../../atoms';
import { FlippingLabel } from '../../molecules';
import { SettingsModal, type SettingsModalProps } from '../modals';
import styles from './settings.module.scss';
import sharedStyles from './toolbar-items.module.scss';

export type SettingsProps = SettingsModalProps & {
  /**
   * The button state.
   */
  isActive: BooleanFieldProps['isChecked'];
  /**
   * A callback function to handle button state.
   */
  setIsActive: BooleanFieldProps['onChange'];
};

const SettingsWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  SettingsProps
> = ({ className = '', isActive = false, setIsActive }, ref) => {
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
    <div className={sharedStyles.item} ref={ref}>
      <BooleanField
        className={sharedStyles.checkbox}
        id="settings-button"
        isChecked={isActive}
        name="settings-button"
        onChange={setIsActive}
        type="checkbox"
        value="open"
      />
      <FlippingLabel
        className={sharedStyles.label}
        htmlFor="settings-button"
        icon={<Icon aria-hidden={true} shape="cog" size="lg" />}
        isActive={isActive}
        label={label}
      />
      <SettingsModal
        className={`${sharedStyles.modal} ${styles.modal} ${className}`}
      />
    </div>
  );
};

export const Settings = forwardRef(SettingsWithRef);
