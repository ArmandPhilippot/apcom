import Form from '@components/atoms/forms/form';
import AckeeSelect, {
  type AckeeSelectProps,
} from '@components/molecules/forms/ackee-select';
import MotionToggle from '@components/molecules/forms/motion-toggle';
import PrismThemeToggle from '@components/molecules/forms/prism-theme-toggle';
import ThemeToggle from '@components/molecules/forms/theme-toggle';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import styles from './settings-form.module.scss';

export type SettingsFormProps = Pick<AckeeSelectProps, 'tooltipClassName'>;

const SettingsForm: FC<SettingsFormProps> = ({ tooltipClassName }) => {
  const intl = useIntl();
  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Settings form',
    id: 'gX+YVy',
    description: 'SettingsForm: an accessible form name',
  });

  return (
    <Form aria-label={ariaLabel} onSubmit={() => null}>
      <ThemeToggle labelClassName={styles.label} value={false} />
      <PrismThemeToggle labelClassName={styles.label} value={false} />
      <MotionToggle labelClassName={styles.label} value={false} />
      <AckeeSelect
        initialValue="full"
        labelClassName={styles.label}
        tooltipClassName={tooltipClassName}
      />
    </Form>
  );
};

export default SettingsForm;
