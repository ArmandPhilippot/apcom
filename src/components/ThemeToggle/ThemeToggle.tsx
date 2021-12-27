import { Form } from '@components/Form';
import { MoonIcon, SunIcon } from '@components/Icons';
import { t } from '@lingui/macro';
import { FormEvent, useState } from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Form modifier="theme" submitHandler={onSubmit}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="dark-theme"
        name="dark-theme"
        checked={isDarkTheme}
        onChange={() => setIsDarkTheme(!isDarkTheme)}
      />
      <label htmlFor="dark-theme" className={styles.label}>
        <span className="screen-reader-text">{t`Activate dark theme`}</span>
        <SunIcon />
        <span className={styles.toggle}></span>
        <MoonIcon />
      </label>
    </Form>
  );
};

export default ThemeToggle;
