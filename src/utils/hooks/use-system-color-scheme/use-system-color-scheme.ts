import { useCallback, useState } from 'react';
import { getThemeFromSystem } from '../../helpers';
import { useMatchMedia } from '../use-match-media';

export type SystemColorScheme = 'dark' | 'light';

/**
 * React hook to retrieve the system color scheme based on user preferences,
 * and to watch for changes.
 *
 * @returns {SystemColorScheme} The system color scheme
 */
export const useSystemColorScheme = () => {
  const [colorScheme, setColorScheme] =
    useState<SystemColorScheme>(getThemeFromSystem);

  const updateColorScheme = useCallback(() => {
    setColorScheme(getThemeFromSystem);
  }, []);

  useMatchMedia('(prefers-color-scheme: dark)', updateColorScheme);

  return colorScheme;
};
