import Prism from 'prismjs';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

const PRISM_PLUGINS = [
  'autoloader',
  'color-scheme',
  'command-line',
  'copy-to-clipboard',
  'diff-highlight',
  'inline-color',
  'line-highlight',
  'line-numbers',
  'match-braces',
  'normalize-whitespace',
  'show-language',
  'toolbar',
] as const;

export type PrismPlugin = (typeof PRISM_PLUGINS)[number];

export type DefaultPrismPlugin = Extract<
  PrismPlugin,
  | 'autoloader'
  | 'color-scheme'
  | 'copy-to-clipboard'
  | 'match-braces'
  | 'normalize-whitespace'
  | 'show-language'
  | 'toolbar'
>;

export type OptionalPrismPlugin = Exclude<PrismPlugin, DefaultPrismPlugin>;

export type PrismLanguage =
  | 'apacheconf'
  | 'bash'
  | 'css'
  | 'diff'
  | 'docker'
  | 'editorconfig'
  | 'ejs'
  | 'git'
  | 'graphql'
  | 'html'
  | 'ignore'
  | 'ini'
  | 'javascript'
  | 'jsdoc'
  | 'json'
  | 'jsx'
  | 'makefile'
  | 'markup'
  | 'php'
  | 'phpdoc'
  | 'regex'
  | 'scss'
  | 'shell-session'
  | 'smarty'
  | 'tcl'
  | 'toml'
  | 'tsx'
  | 'twig'
  | 'yaml';

export type PrismAttributes = {
  'data-prismjs-copy': string;
  'data-prismjs-copy-success': string;
  'data-prismjs-copy-error': string;
  'data-prismjs-color-scheme-dark': string;
  'data-prismjs-color-scheme-light': string;
};

export type UsePrismProps = {
  language?: PrismLanguage;
  plugins: OptionalPrismPlugin[];
};

export type UsePrismReturn = {
  attributes: PrismAttributes;
  className: string;
};

/**
 * Import and configure all given Prism plugins.
 *
 * @param {PrismPlugin[]} plugins - The Prism plugins to activate.
 */
const loadPrismPlugins = async (plugins: PrismPlugin[]) => {
  for (const plugin of plugins) {
    try {
      if (plugin === 'color-scheme') {
        await import(`../plugins/prism-${plugin}`);
      } else {
        await import(`prismjs/plugins/${plugin}/prism-${plugin}.min.js`);
      }

      if (plugin === 'autoloader') {
        Prism.plugins.autoloader.languages_path = '/prism/';
      }
    } catch (error) {
      console.error('usePrism: an error occurred while loading Prism plugins.');
      console.error(error);
    }
  }
};

/**
 * Use Prism and its plugins.
 *
 * @param {UsePrismProps} props - An object of options.
 * @returns {UsePrismReturn} An object of data.
 */
const usePrism = ({ language, plugins }: UsePrismProps): UsePrismReturn => {
  /**
   * The order matter. Toolbar must be loaded before some other plugins.
   */
  const defaultPlugins: DefaultPrismPlugin[] = useMemo(
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

  const defaultClassName = 'match-braces';
  const languageClassName = language ? `language-${language}` : '';
  const pluginsClassName = plugins.join(' ');
  const className = `${defaultClassName} ${pluginsClassName} ${languageClassName}`;

  const intl = useIntl();
  const copyText = intl.formatMessage({
    defaultMessage: 'Copy',
    description: 'usePrism: copy button text (not clicked)',
    id: '6GySNl',
  });
  const copiedText = intl.formatMessage({
    defaultMessage: 'Copied!',
    description: 'usePrism: copy button text (clicked)',
    id: 'nsw6Th',
  });
  const errorText = intl.formatMessage({
    defaultMessage: 'Use Ctrl+c to copy',
    description: 'usePrism: copy button error text',
    id: 'lKhTGM',
  });
  const darkTheme = intl.formatMessage({
    defaultMessage: 'Dark Theme 🌙',
    description: 'usePrism: toggle dark theme button text',
    id: 'QLisK6',
  });
  const lightTheme = intl.formatMessage({
    defaultMessage: 'Light Theme 🌞',
    description: 'usePrism: toggle light theme button text',
    id: 'hHVgW3',
  });
  const attributes = {
    'data-prismjs-copy': copyText,
    'data-prismjs-copy-success': copiedText,
    'data-prismjs-copy-error': errorText,
    'data-prismjs-color-scheme-dark': darkTheme,
    'data-prismjs-color-scheme-light': lightTheme,
  };

  return {
    attributes,
    className,
  };
};

export default usePrism;
