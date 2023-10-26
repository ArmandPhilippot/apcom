/* eslint-disable max-statements */
import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
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
  if (typeof window === 'undefined') return undefined;

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Check if a given string is a Prism theme name.
 *
 * @param {string} theme - A string.
 * @returns {boolean} True if the given string match a Prism theme name.
 */
const isValidTheme = (theme: string): boolean =>
  theme === 'dark' || theme === 'light' || theme === 'system';

const defaultThemes = ['dark', 'light', 'system'] satisfies PrismTheme[];

const validator = (value: unknown): value is PrismTheme =>
  typeof value === 'string' && (defaultThemes as string[]).includes(value);

export const PrismThemeProvider: FC<PrismThemeProviderProps> = ({
  attribute = 'data-prismjs-color-scheme-current',
  storageKey = 'prismjs-color-scheme',
  themes = defaultThemes,
  children,
}) => {
  /**
   * Retrieve the theme to use depending on `prefers-color-scheme`.
   */
  const getThemeFromSystem = useCallback(() => {
    if (prefersDarkScheme()) return 'dark';
    return 'light';
  }, []);

  const [prismTheme, setPrismTheme] = useLocalStorage<PrismTheme>(
    storageKey,
    'system',
    validator
  );

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
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((record) => {
          const mutatedPre = record.target as HTMLPreElement;
          const newTheme = mutatedPre.getAttribute(attribute) as PrismTheme;
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

  const value = useMemo(() => {
    return {
      themes,
      theme: prismTheme,
      setTheme: setPrismTheme,
      codeBlocks: preTags,
      resolvedTheme,
    };
  }, [preTags, prismTheme, resolvedTheme, setPrismTheme, themes]);

  return (
    <PrismThemeContext.Provider value={value}>
      {children}
    </PrismThemeContext.Provider>
  );
};
