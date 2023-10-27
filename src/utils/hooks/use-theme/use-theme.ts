import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../providers';

export const useTheme = () => {
  const { resolvedTheme, theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    setTheme(() => {
      if (resolvedTheme === 'dark') return 'light';
      return 'dark';
    });
  }, [resolvedTheme, setTheme]);

  return { resolvedTheme, setTheme, theme, toggleTheme };
};
