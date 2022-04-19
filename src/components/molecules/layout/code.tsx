import usePrismPlugins, {
  type PrismPlugin,
} from '@utils/hooks/use-prism-plugins';
import { FC } from 'react';
import styles from './code.module.scss';

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

export type OptionalPrismPlugin = Extract<
  PrismPlugin,
  | 'command-line'
  | 'diff-highlight'
  | 'inline-color'
  | 'line-highlight'
  | 'line-numbers'
>;

export type CodeProps = {
  /**
   * The code to highlight.
   */
  children: string;
  /**
   * Filter command line output. Default: false.
   */
  filterOutput?: boolean;
  /**
   * The code language.
   */
  language: PrismLanguage;
  /**
   * The optional Prism plugins.
   */
  plugins?: OptionalPrismPlugin[];
  /**
   * Filter command line output using the given string. Default: #output#
   */
  outputPattern?: string;
};

/**
 * Code component
 *
 * Render a code block with syntax highlighting.
 */
const Code: FC<CodeProps> = ({
  children,
  filterOutput = false,
  language,
  plugins = [],
  outputPattern = '#output#',
}) => {
  const { pluginsAttribute, pluginsClassName } = usePrismPlugins(plugins);

  const outputAttribute = filterOutput
    ? { 'data-filter-output': outputPattern }
    : {};

  return (
    <div className={styles.wrapper}>
      <pre
        className={`language-${language} ${pluginsClassName}`}
        {...pluginsAttribute}
        {...outputAttribute}
      >
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};

export default Code;
