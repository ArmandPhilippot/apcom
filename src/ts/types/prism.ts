export type PrismLanguages =
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

export type PrismDefaultPlugins =
  | 'autoloader'
  | 'color-scheme'
  | 'copy-to-clipboard'
  | 'match-braces'
  | 'normalize-whitespace'
  | 'show-language'
  | 'toolbar';

export type PrismPlugins =
  | 'command-line'
  | 'diff-highlight'
  | 'inline-color'
  | 'line-highlight'
  | 'line-numbers';

export type PrismProviderProps = {
  language: PrismLanguages;
  plugins: PrismPlugins[];
};
