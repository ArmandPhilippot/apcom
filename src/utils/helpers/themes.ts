/**
 * Check if the user prefers dark color scheme.
 *
 * @returns {boolean|undefined} True if `prefers-color-scheme` is set to `dark`.
 */
export const prefersDarkScheme = (): boolean | undefined => {
  if (typeof window === 'undefined') return undefined;

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Retrieve the theme to use depending on the user system theme.
 */
export const getThemeFromSystem = () => {
  if (prefersDarkScheme()) return 'dark';
  return 'light';
};
