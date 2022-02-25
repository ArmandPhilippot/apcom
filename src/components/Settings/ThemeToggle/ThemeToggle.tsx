import { Toggle } from '@components/FormElements';
import { MoonIcon, SunIcon } from '@components/Icons';
import Spinner from '@components/Spinner/Spinner';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const ThemeToggle = () => {
  const intl = useIntl();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Spinner />;

  const isDarkTheme = resolvedTheme === 'dark';

  const updateTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  return (
    <Toggle
      id="dark-theme"
      label={intl.formatMessage({
        defaultMessage: 'Theme:',
        description: 'ThemeToggle: toggle label',
      })}
      leftChoice={<SunIcon />}
      rightChoice={<MoonIcon />}
      value={isDarkTheme}
      changeHandler={updateTheme}
    />
  );
};

export default ThemeToggle;
