import { Toggle } from '@components/FormElements';
import { LocalStorage } from '@services/local-storage';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const ReduceMotion = () => {
  const intl = useIntl();
  const [isDeactivated, setIsDeactivated] = useState<boolean>(false);

  useEffect(() => {
    const initialState = LocalStorage.get('reduced-motion');
    if (initialState) setIsDeactivated(initialState === 'true' ? true : false);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = `${isDeactivated}`;
    LocalStorage.set('reduced-motion', `${isDeactivated}`);
  }, [isDeactivated]);

  const updateState = () => {
    setIsDeactivated(!isDeactivated);
  };

  return (
    <Toggle
      id="reduced-motion"
      label={intl.formatMessage({
        defaultMessage: 'Animations:',
        description: 'ReduceMotion: toggle label',
        id: 'X3PDXO',
      })}
      leftChoice={intl.formatMessage({
        defaultMessage: 'On',
        description: 'ReduceMotion: toggle on label',
        id: 'qPU/Qn',
      })}
      rightChoice={intl.formatMessage({
        defaultMessage: 'Off',
        description: 'ReduceMotion: toggle off label',
        id: 'w1nIrj',
      })}
      value={isDeactivated}
      changeHandler={updateState}
    />
  );
};

export default ReduceMotion;
