import { Toggle } from '@components/FormElements';
import { MoonIcon, SunIcon } from '@components/Icons';
import Spinner from '@components/Spinner/Spinner';
import { usePrismTheme } from '@utils/providers/prism';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const PrismThemeToggle = () => {
  const intl = useIntl();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { theme, setTheme, resolvedTheme } = usePrismTheme();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(theme === 'dark');

  useEffect(() => {
    if (theme === 'system') {
      setIsDarkTheme(resolvedTheme === 'dark');
    } else {
      setIsDarkTheme(theme === 'dark');
    }
  }, [theme, resolvedTheme]);

  const updateTheme = () => {
    isDarkTheme ? setTheme('light') : setTheme('dark');
    setIsDarkTheme(!isDarkTheme);
  };

  if (!isMounted) return <Spinner />;

  return (
    <Toggle
      id="prism-theme"
      label={intl.formatMessage({
        defaultMessage: 'Code blocks:',
        description: 'PrismThemeToggle: toggle label',
      })}
      leftChoice={<SunIcon />}
      rightChoice={<MoonIcon />}
      value={isDarkTheme}
      changeHandler={updateTheme}
    />
  );
};

export default PrismThemeToggle;
