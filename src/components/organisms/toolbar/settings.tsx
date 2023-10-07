import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { BooleanField, type BooleanFieldProps, Icon } from '../../atoms';
import { FlippingLabel } from '../../molecules';
import { SettingsModal, type SettingsModalProps } from '../modals';
import styles from './toolbar-items.module.scss';

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
> = (
  {
    ackeeStorageKey,
    className = '',
    isActive = false,
    motionStorageKey,
    setIsActive,
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
    <div className={styles.item} ref={ref}>
      <BooleanField
        className={styles.checkbox}
        id="settings-button"
        isChecked={isActive}
        name="settings-button"
        onChange={setIsActive}
        type="checkbox"
        value="open"
      />
      <FlippingLabel
        className={styles.label}
        htmlFor="settings-button"
        icon={<Icon aria-hidden={true} shape="cog" size="lg" />}
        isActive={isActive}
        label={label}
      />
      <SettingsModal
        ackeeStorageKey={ackeeStorageKey}
        className={`${styles.modal} ${className}`}
        motionStorageKey={motionStorageKey}
      />
    </div>
  );
};

export const Settings = forwardRef(SettingsWithRef);
