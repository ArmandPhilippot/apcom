import { Field, Label } from '@components/FormElements';
import Tooltip from '@components/Tooltip/Tooltip';
import { LocalStorage } from '@services/local-storage';
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
        id: 'e/8Kyj',
      }),
      value: 'partial',
    },
    {
      id: 'full',
      name: intl.formatMessage({
        defaultMessage: 'Full',
        description: 'AckeeSelect: full option name',
        id: 'PzRpPw',
      }),
      value: 'full',
    },
  ];
  const [value, setValue] = useState<string>('full');
  const { setDetailed } = useAckeeTracker();

  useEffect(() => {
    setDetailed(value === 'full');
  }, [setDetailed, value]);

  useEffect(() => {
    const initialState = LocalStorage.get('ackee-tracking');
    if (initialState) setValue(initialState);
  }, []);

  useEffect(() => {
    LocalStorage.set('ackee-tracking', `${value}`);
  }, [value]);

  const label = (
    <Label
      body={intl.formatMessage({
        defaultMessage: 'Tracking:',
        description: 'AckeeSelect: select label',
        id: '2pmylc',
      })}
      htmlFor="ackee-settings"
      kind="settings"
    />
  );

  const message = [
    intl.formatMessage({
      defaultMessage: 'Partial includes only page url, views and duration.',
      description: 'AckeeSelect: tooltip message',
      id: 'skb4W5',
    }),
    intl.formatMessage({
      defaultMessage:
        'Full includes all information from partial as well as information about referrer, operating system, device, browser, screen size and language.',
      description: 'AckeeSelect: tooltip message',
      id: 'Ogccx6',
    }),
  ];

  return (
    <div className={styles.wrapper}>
      <Field
        id="ackee-settings"
        name="ackee-settings"
        kind="select"
        label={label}
        options={options}
        value={value}
        setValue={setValue}
      />
      <Tooltip
        message={message}
        title={intl.formatMessage({
          defaultMessage: 'Ackee tracking (analytics)',
          description: 'AckeeSelect: tooltip title',
          id: 'F1EQX3',
        })}
      />
    </div>
  );
};

export default AckeeSelect;
