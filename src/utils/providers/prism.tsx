import { LocalStorage } from '@services/local-storage';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type PrismTheme = 'dark' | 'light' | 'system';
export type ResolvedPrismTheme = 'dark' | 'light';

export type UsePrismThemeProps = {
  themes: PrismTheme[];
  theme?: PrismTheme;
  setTheme: (theme: PrismTheme) => void;
  resolvedTheme?: ResolvedPrismTheme;
  codeBlocks?: NodeListOf<HTMLPreElement>;
  setCodeBlocks: (codeBlocks: NodeListOf<HTMLPreElement>) => void;
};

export type PrismThemeProviderProps = {
  attribute?: string;
  storageKey?: string;
  themes?: PrismTheme[];
};

export const PrismThemeContext = createContext<UsePrismThemeProps>({
  themes: ['dark', 'light', 'system'],
  setTheme: (_) => {},
  setCodeBlocks: (_) => {},
});

export const usePrismTheme = () => useContext(PrismThemeContext);

const prefersDarkScheme = () => {
  if (typeof window === 'undefined') return;

  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
};

const isValidTheme = (theme: string): boolean => {
  return theme === 'dark' || theme === 'light' || theme === 'system';
};

const getTheme = (key: string): PrismTheme | undefined => {
  if (typeof window === 'undefined') return undefined;
  const storageValue = LocalStorage.get(key);

  return storageValue && isValidTheme(storageValue)
    ? (storageValue as PrismTheme)
    : undefined;
};

export const PrismThemeProvider: FC<PrismThemeProviderProps> = ({
  attribute = 'data-prismjs-color-scheme-current',
  storageKey = 'prismjs-color-scheme',
  themes = ['dark', 'light', 'system'],
  children,
}) => {
  const getThemeFromSystem = useCallback(() => {
    return prefersDarkScheme() ? 'dark' : 'light';
  }, []);

  const [prismTheme, setPrismTheme] = useState<PrismTheme>(
    getTheme(storageKey) || 'system'
  );

  const updateTheme = (theme: PrismTheme) => {
    setPrismTheme(theme);
  };

  useEffect(() => {
    LocalStorage.set(storageKey, prismTheme);
  }, [prismTheme, storageKey]);

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

  const [preTags, setPreTags] = useState<NodeListOf<HTMLPreElement>>();

  const updatePreTags = useCallback((tags: NodeListOf<HTMLPreElement>) => {
    setPreTags(tags);
  }, []);

  const updatePreTagsAttribute = useCallback(() => {
    preTags?.forEach((pre) => {
      pre.setAttribute(attribute, prismTheme);
    });
  }, [attribute, preTags, prismTheme]);

  useEffect(() => {
    updatePreTagsAttribute();
  }, [updatePreTagsAttribute, prismTheme]);

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
    [attribute]
  );

  useEffect(() => {
    if (!preTags) return;

    preTags.forEach((pre) => {
      listenAttributeChange(pre);
    });
  }, [preTags, listenAttributeChange]);

  return (
    <PrismThemeContext.Provider
      value={{
        themes,
        theme: prismTheme,
        setTheme: updateTheme,
        codeBlocks: preTags,
        setCodeBlocks: updatePreTags,
        resolvedTheme,
      }}
    >
      {children}
    </PrismThemeContext.Provider>
  );
};
