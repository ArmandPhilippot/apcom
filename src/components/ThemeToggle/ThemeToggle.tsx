import { Form } from '@components/Form';
import { MoonIcon, SunIcon } from '@components/Icons';
import Spinner from '@components/Spinner/Spinner';
import { t } from '@lingui/macro';
import { useTheme } from 'next-themes';
import { FormEvent, useEffect, useState } from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  if (!isMounted) return <Spinner />;

  const isDarkTheme = resolvedTheme === 'dark';

  return (
    <Form modifier="theme" submitHandler={onSubmit}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="dark-theme"
        name="dark-theme"
        checked={isDarkTheme}
        onChange={() => setTheme(isDarkTheme ? 'light' : 'dark')}
      />
      <label htmlFor="dark-theme" className={styles.label}>
        <span className={styles.title}>{t`Theme:`}</span>
        <SunIcon />
        <span className={styles.toggle}></span>
        <MoonIcon />
      </label>
    </Form>
  );
};

export default ThemeToggle;
