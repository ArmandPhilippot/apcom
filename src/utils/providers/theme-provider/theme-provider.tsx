import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useMemo,
  useEffect,
} from 'react';
import type { Theme } from '../../../types';
import {
  getDataAttributeFrom,
  getThemeFromSystem,
  themeValidator,
} from '../../helpers';
import { useLocalStorage, useSystemColorScheme } from '../../hooks';

type ThemeContextProps = {
  resolvedTheme: Exclude<Theme, 'system'>;
  setTheme: Dispatch<SetStateAction<Theme>>;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextProps>({
  resolvedTheme: getThemeFromSystem(),
  setTheme: (value) => value,
  theme: 'system',
});

export type ThemeProviderProps = {
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

export const ThemeProvider: FC<ThemeProviderProps> = ({
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
  const userColorScheme = useSystemColorScheme();
  const resolvedTheme: Exclude<Theme, 'system'> =
    theme === 'system' ? userColorScheme : theme;
  const dataAttribute = getDataAttributeFrom(attribute);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute(dataAttribute, `${resolvedTheme}`);
      document.documentElement.style.colorScheme = resolvedTheme;
    }

    return () => {
      document.documentElement.removeAttribute(dataAttribute);
    };
  }, [dataAttribute, resolvedTheme]);

  const value = useMemo(() => {
    return { resolvedTheme, setTheme, theme };
  }, [resolvedTheme, setTheme, theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
