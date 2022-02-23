import { Label, Select } from '@components/Form';
import { useAckeeTracker } from '@utils/providers/ackee';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './AckeeSelect.module.scss';

const AckeeSelect = () => {
  const intl = useIntl();
  const options = [
    {
      id: 'partial',
      name: intl.formatMessage({
        defaultMessage: 'Partial',
        description: 'AckeeSelect: partial option name',
      }),
      value: 'partial',
    },
    {
      id: 'full',
      name: intl.formatMessage({
        defaultMessage: 'Full',
        description: 'AckeeSelect: full option name',
      }),
      value: 'full',
    },
  ];
  const [value, setValue] = useState<string>('full');
  const { setDetailed } = useAckeeTracker();

  useEffect(() => {
    setDetailed(value === 'full');
  }, [setDetailed, value]);

  const label = (
    <Label
      body={intl.formatMessage({
        defaultMessage: 'Analytic tracking:',
        description: 'AckeeSelect: select label',
      })}
      htmlFor="ackee-settings"
      kind="settings"
    />
  );

  return (
    <div className={styles.wrapper}>
      <Select
        id="ackee-settings"
        name="ackee-settings"
        label={label}
        options={options}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export default AckeeSelect;
