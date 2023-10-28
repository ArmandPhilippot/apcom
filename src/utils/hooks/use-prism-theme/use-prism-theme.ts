import { useCallback, useContext, useEffect } from 'react';
import { themeValidator as isValidTheme } from '../../helpers';
import { PrismThemeContext } from '../../providers/prism-theme-provider';

export const usePrismTheme = () => {
  const { attribute, resolvedTheme, setTheme, theme } =
    useContext(PrismThemeContext);
  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  const handleMutations: MutationCallback = useCallback(
    (mutations) => {
      for (const mutation of mutations) {
        if (mutation.target.nodeName.toLowerCase() !== 'pre') return;

        const newTheme = (mutation.target as HTMLPreElement).getAttribute(
          attribute
        );

        if (isValidTheme(newTheme) && newTheme !== theme) setTheme(newTheme);
      }
    },
    [attribute, setTheme, theme]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const preElements = document.getElementsByTagName('pre');
    const observer = new MutationObserver(handleMutations);

    for (const preEl of Array.from(preElements)) {
      if (preEl.className.includes('language-')) {
        preEl.setAttribute(attribute, theme);
        observer.observe(preEl, {
          attributes: true,
          attributeFilter: [attribute],
        });
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [attribute, handleMutations, theme]);

  const toggleTheme = useCallback(() => {
    setTheme(() => {
      if (currentTheme === 'dark') return 'light';
      return 'dark';
    });
  }, [currentTheme, setTheme]);

  return { currentTheme, resolvedTheme, setTheme, theme, toggleTheme };
};
