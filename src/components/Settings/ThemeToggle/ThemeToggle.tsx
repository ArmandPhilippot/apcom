import { Toggle } from '@components/Form';
import { MoonIcon, SunIcon } from '@components/Icons';
import Spinner from '@components/Spinner/Spinner';
import { t } from '@lingui/macro';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
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
      label={t`Theme:`}
      leftChoice={<SunIcon />}
      rightChoice={<MoonIcon />}
      value={isDarkTheme}
      changeHandler={updateTheme}
    />
  );
};

export default ThemeToggle;
