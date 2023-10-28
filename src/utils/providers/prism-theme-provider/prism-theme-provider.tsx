import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useEffect,
  useMemo,
} from 'react';
import type { Theme } from '../../../types';
import {
  getDataAttributeFrom,
  getThemeFromSystem,
  themeValidator,
} from '../../helpers';
import { useLocalStorage, useSystemColorScheme } from '../../hooks';

export type PrismThemeContextProps = {
  attribute: string;
  resolvedTheme: Exclude<Theme, 'system'>;
  setTheme: Dispatch<SetStateAction<Theme>>;
  theme: Theme;
};

export const PrismThemeContext = createContext<PrismThemeContextProps>({
  attribute: 'data-prism-theme',
  resolvedTheme: getThemeFromSystem(),
  setTheme: (value) => value,
  theme: 'system',
});

export type PrismThemeProviderProps = {
  /**
   * The attribute name to append to document root.
   */
  attribute: string;
  /**
   * The provider children.
   */
  children?: ReactNode;
  /**
   * The default theme.
   *
   * @default 'system'
   */
  defaultTheme?: Theme;
  /**
   * The key to use in local storage.
   */
  storageKey: string;
};

export const PrismThemeProvider: FC<PrismThemeProviderProps> = ({
  attribute,
  children,
  defaultTheme = 'system',
  storageKey,
}) => {
  const [theme, setTheme] = useLocalStorage(
    storageKey,
    defaultTheme,
    themeValidator
  );
  const resolvedTheme = useSystemColorScheme();
  const dataAttribute = getDataAttributeFrom(attribute);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute(dataAttribute, `${theme}`);
    }

    return () => {
      document.documentElement.removeAttribute(dataAttribute);
    };
  }, [dataAttribute, theme]);

  const value = useMemo(() => {
    return { attribute: dataAttribute, resolvedTheme, setTheme, theme };
  }, [dataAttribute, resolvedTheme, setTheme, theme]);

  return (
    <PrismThemeContext.Provider value={value}>
      {children}
    </PrismThemeContext.Provider>
  );
};
