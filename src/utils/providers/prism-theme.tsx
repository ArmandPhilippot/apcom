import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAttributes, useLocalStorage, useQuerySelectorAll } from '../hooks';

export type PrismTheme = 'dark' | 'light' | 'system';
export type ResolvedPrismTheme = Exclude<PrismTheme, 'system'>;

export type UsePrismThemeProps = {
  themes: PrismTheme[];
  theme?: PrismTheme;
  setTheme: (theme: PrismTheme) => void;
  resolvedTheme?: ResolvedPrismTheme;
  codeBlocks?: NodeListOf<HTMLPreElement>;
};

export type PrismThemeProviderProps = {
  attribute?: string;
  children: ReactNode;
  storageKey?: string;
  themes?: PrismTheme[];
};

export const PrismThemeContext = createContext<UsePrismThemeProps>({
  themes: ['dark', 'light', 'system'],
  setTheme: (_) => {
    // This is intentional.
  },
});

export const usePrismTheme = () => useContext(PrismThemeContext);

/**
 * Check if user prefers dark color scheme.
 *
 * @returns {boolean|undefined} True if `prefers-color-scheme` is set to `dark`.
 */
const prefersDarkScheme = (): boolean | undefined => {
  if (typeof window === 'undefined') return;

  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
};

/**
 * Check if a given string is a Prism theme name.
 *
 * @param {string} theme - A string.
 * @returns {boolean} True if the given string match a Prism theme name.
 */
const isValidTheme = (theme: string): boolean => {
  return theme === 'dark' || theme === 'light' || theme === 'system';
};

export const PrismThemeProvider: FC<PrismThemeProviderProps> = ({
  attribute = 'data-prismjs-color-scheme-current',
  storageKey = 'prismjs-color-scheme',
  themes = ['dark', 'light', 'system'],
  children,
}) => {
  /**
   * Retrieve the theme to use depending on `prefers-color-scheme`.
   */
  const getThemeFromSystem = useCallback(() => {
    return prefersDarkScheme() ? 'dark' : 'light';
  }, []);

  const { value: prismTheme, setValue: setPrismTheme } =
    useLocalStorage<PrismTheme>(storageKey, 'system');

  useEffect(() => {
    if (!isValidTheme(prismTheme)) setPrismTheme('system');
  }, [prismTheme, setPrismTheme]);

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedPrismTheme>();

  useEffect(() => {
    if (prismTheme === 'dark' || prismTheme === 'light') {
      setResolvedTheme(prismTheme);
    } else {
      setResolvedTheme(getThemeFromSystem());
    }
  }, [prismTheme, getThemeFromSystem]);

  const updateResolvedTheme = useCallback(() => {
    setResolvedTheme(getThemeFromSystem());
  }, [getThemeFromSystem]);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateResolvedTheme);

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', updateResolvedTheme);
  }, [updateResolvedTheme]);

  const preTags = useQuerySelectorAll<'pre'>('pre');
  useAttributes({ elements: preTags, attribute, value: prismTheme });

  /**
   * Listen for changes on pre attributes and update theme.
   */
  const listenAttributeChange = useCallback(
    (pre: HTMLPreElement) => {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach((record) => {
          var mutatedPre = record.target as HTMLPreElement;
          var newTheme = mutatedPre.getAttribute(attribute) as PrismTheme;
          setPrismTheme(newTheme);
        });
      });
      observer.observe(pre, {
        attributes: true,
        attributeFilter: [attribute],
      });
    },
    [attribute, setPrismTheme]
  );

  useEffect(() => {
    if (!preTags) return;
    preTags.forEach(listenAttributeChange);
  }, [preTags, listenAttributeChange]);

  return (
    <PrismThemeContext.Provider
      value={{
        themes,
        theme: prismTheme,
        setTheme: setPrismTheme,
        codeBlocks: preTags,
        resolvedTheme,
      }}
    >
      {children}
    </PrismThemeContext.Provider>
  );
};
