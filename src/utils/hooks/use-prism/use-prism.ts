import Prism from 'prismjs';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

export type PrismToolbarAttributes = {
  'data-prismjs-copy': string;
  'data-prismjs-copy-success': string;
  'data-prismjs-copy-error': string;
  'data-prismjs-color-scheme-dark': string;
  'data-prismjs-color-scheme-light': string;
};

export type PrismAttributes = PrismToolbarAttributes & {
  'data-continuation-prompt'?: string;
  'data-continuation-str'?: string;
  'data-filter-output'?: string;
  'data-filter-continuation'?: string;
  'data-host'?: string;
  'data-line'?: string;
  'data-prompt'?: string;
  'data-output'?: string;
  'data-start'?: string;
  'data-toolbar-order'?: string;
  'data-user'?: string;
};

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
  | 'treeview'
  | 'tsx'
  | 'twig'
  | 'yaml';

export type PrismAvailablePlugin =
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
  | 'toolbar'
  | 'treeview';

type PrismPlugin = {
  name: PrismAvailablePlugin;
  hasClassName: boolean;
};

const prismPlugins: PrismPlugin[] = [
  { name: 'toolbar', hasClassName: false },
  { name: 'autoloader', hasClassName: false },
  { name: 'show-language', hasClassName: false },
  { name: 'color-scheme', hasClassName: false },
  { name: 'copy-to-clipboard', hasClassName: false },
  { name: 'command-line', hasClassName: true },
  { name: 'diff-highlight', hasClassName: true },
  { name: 'inline-color', hasClassName: false },
  { name: 'line-highlight', hasClassName: false },
  { name: 'line-numbers', hasClassName: true },
  { name: 'match-braces', hasClassName: true },
  { name: 'normalize-whitespace', hasClassName: false },
  { name: 'treeview', hasClassName: false },
];

/**
 * Reorder the given plugins.
 *
 * The toolbar plugin must be loaded before some other plugins, so we need to
 * ensure it is at the beginning of the array.
 *
 * @param {PrismAvailablePlugin[]} plugins - An array of Prism plugins.
 * @returns {PrismAvailablePlugin[]} The sorted plugins.
 */
const sortPlugins = (
  plugins: PrismAvailablePlugin[]
): PrismAvailablePlugin[] => {
  if (!plugins.includes('toolbar')) return plugins;

  const remainingPlugins = plugins.filter((plugin) => plugin !== 'toolbar');

  return ['toolbar', ...remainingPlugins];
};

/**
 * Import and configure all given Prism plugins.
 *
 * @param {PrismAvailablePlugin[]} plugins - The plugins to activate.
 */
const loadPrismPlugins = async (plugins: PrismAvailablePlugin[]) => {
  if (!plugins.length) return;

  const orderedPlugins = sortPlugins(plugins);

  try {
    const importPromises = orderedPlugins.map(async (plugin) => {
      if (plugin === 'color-scheme') {
        return import('../../plugins/prism-color-scheme.cjs');
      }

      return import(`prismjs/plugins/${plugin}/prism-${plugin}.min.js`);
    });

    await importPromises.reduce(async (currImport, nextImport) =>
      currImport.then(await nextImport)
    );

    if (orderedPlugins.includes('autoloader'))
      // cSpell:ignore camelcase
      // eslint-disable-next-line camelcase -- Case is coming from Prism
      Prism.plugins.autoloader.languages_path = '/prism/';
  } catch (error) {
    console.error('usePrism: an error occurred while loading Prism plugins.');
    console.error(error);
  }
};

export type UsePrismProps = {
  attributes?: Omit<PrismAttributes, keyof PrismToolbarAttributes>;
  language?: PrismLanguage;
  plugins?: PrismAvailablePlugin[];
};

/**
 * Use Prism and its plugins.
 *
 * @param {UsePrismProps} props - An object of options.
 * @returns An object with attributes and className.
 */
export const usePrism = ({ attributes, language, plugins }: UsePrismProps) => {
  const intl = useIntl();
  const pluginsToLoad = prismPlugins.filter(
    (plugin) => plugins?.includes(plugin.name)
  );

  const pluginClasses = pluginsToLoad
    .map((plugin) => {
      if (plugin.hasClassName) return plugin.name;
      return undefined;
    })
    .filter((maybeStr): maybeStr is PrismAvailablePlugin => !!maybeStr);

  const diffClass = language ? `language-diff-${language}` : 'language-diff';
  const languageClass = plugins?.includes('diff-highlight')
    ? diffClass
    : `language-${language}`;

  const className = [language ? languageClass : '', ...pluginClasses].join(' ');

  const toolbarAttributes: PrismToolbarAttributes = {
    'data-prismjs-color-scheme-dark': intl.formatMessage({
      defaultMessage: 'Dark Theme 🌙',
      description: 'usePrism: toggle dark theme button text',
      id: 'QLisK6',
    }),
    'data-prismjs-color-scheme-light': intl.formatMessage({
      defaultMessage: 'Light Theme 🌞',
      description: 'usePrism: toggle light theme button text',
      id: 'hHVgW3',
    }),
    'data-prismjs-copy': intl.formatMessage({
      defaultMessage: 'Copy',
      description: 'usePrism: copy button text (not clicked)',
      id: '6GySNl',
    }),
    'data-prismjs-copy-error': intl.formatMessage({
      defaultMessage: 'Use Ctrl+c to copy',
      description: 'usePrism: copy button error text',
      id: 'lKhTGM',
    }),
    'data-prismjs-copy-success': intl.formatMessage({
      defaultMessage: 'Copied!',
      description: 'usePrism: copy button text (clicked)',
      id: 'nsw6Th',
    }),
  };

  useEffect(() => {
    loadPrismPlugins(pluginsToLoad.map((plugin) => plugin.name)).then(() => {
      Prism.highlightAll();
    });
  }, [pluginsToLoad]);

  return {
    attributes: { ...toolbarAttributes, ...attributes },
    className,
  };
};
