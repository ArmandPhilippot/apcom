import Prism from 'prismjs';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

export type PrismPlugin =
  | 'autoloader'
  | 'color-scheme'
  | 'command-line'
  | 'copy-to-clipboard'
  | 'diff-highlight'
  | 'inline-color'
  | 'line-highlight'
  | 'line-numbers'
  | 'match-braces'
  | 'normalize-whitespace'
  | 'show-language'
  | 'toolbar';

/**
 * Import and configure all given Prism plugins.
 *
 * @param {PrismPlugin[]} prismPlugins - The Prism plugins to activate.
 */
const loadPrismPlugins = async (prismPlugins: PrismPlugin[]) => {
  for (const plugin of prismPlugins) {
    try {
      if (plugin === 'color-scheme') {
        await import(`@utils/plugins/prism-${plugin}`);
      } else {
        await import(`prismjs/plugins/${plugin}/prism-${plugin}.min.js`);
      }

      if (plugin === 'autoloader') {
        Prism.plugins.autoloader.languages_path = '/prism/';
      }
    } catch (error) {
      console.error(
        'usePrismPlugins: an error occurred while loading Prism plugins.'
      );
      console.error(error);
    }
  }
};

/**
 * Load both the given Prism plugins and the default plugins.
 *
 * @param {PrismPlugin[]} plugins - The Prism plugins to activate.
 */
const usePrismPlugins = (plugins: PrismPlugin[]) => {
  const intl = useIntl();

  const copyText = intl.formatMessage({
    defaultMessage: 'Copy',
    description: 'usePrismPlugins: copy button text (not clicked)',
    id: 'FIE/eC',
  });
  const copiedText = intl.formatMessage({
    defaultMessage: 'Copied!',
    description: 'usePrismPlugins: copy button text (clicked)',
    id: 'MzLdEl',
  });
  const errorText = intl.formatMessage({
    defaultMessage: 'Use Ctrl+c to copy',
    description: 'usePrismPlugins: copy button error text',
    id: '0XePFn',
  });
  const darkTheme = intl.formatMessage({
    defaultMessage: 'Dark Theme 🌙',
    description: 'usePrismPlugins: toggle dark theme button text',
    id: 'jo9vr5',
  });
  const lightTheme = intl.formatMessage({
    defaultMessage: 'Light Theme 🌞',
    description: 'usePrismPlugins: toggle light theme button text',
    id: '6EUEtH',
  });

  const attributes = {
    'data-prismjs-copy': copyText,
    'data-prismjs-copy-success': copiedText,
    'data-prismjs-copy-error': errorText,
    'data-prismjs-color-scheme-dark': darkTheme,
    'data-prismjs-color-scheme-light': lightTheme,
  };

  const defaultPlugins: PrismPlugin[] = useMemo(
    () => [
      'toolbar',
      'autoloader',
      'show-language',
      'copy-to-clipboard',
      'color-scheme',
      'match-braces',
      'normalize-whitespace',
    ],
    []
  );

  useEffect(() => {
    loadPrismPlugins([...defaultPlugins, ...plugins]).then(() => {
      Prism.highlightAll();
    });
  }, [defaultPlugins, plugins]);

  const defaultPluginsClasses = 'match-braces';
  const pluginsClasses = plugins.join(' ');

  return {
    pluginsAttribute: attributes,
    pluginsClassName: `${defaultPluginsClasses} ${pluginsClasses}`,
  };
};

export default usePrismPlugins;
