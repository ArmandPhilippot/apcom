import { Toggle } from '@components/Form';
import { t } from '@lingui/macro';
import { LocalStorage } from '@services/local-storage';
import { useEffect, useState } from 'react';

const ReduceMotion = () => {
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
      label={t`Animations:`}
      leftChoice={t`On`}
      rightChoice={t`Off`}
      value={isDeactivated}
      changeHandler={updateState}
    />
  );
};

export default ReduceMotion;
