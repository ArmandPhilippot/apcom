import { forwardRef, type ForwardRefRenderFunction } from 'react';
import {
  usePrism,
  type PrismLanguage,
  type PrismAvailablePlugin,
} from '../../../utils/hooks';
import { Figure, type FigureProps } from '../../atoms';
import styles from './code.module.scss';

export type CodeProps = Omit<FigureProps, 'children'> & {
  /**
   * The code to highlight.
   */
  children: string;
  /**
   * Define a pattern to automatically present some lines as continuation lines
   * when using command line.
   *
   * @default undefined
   */
  cmdContinuationFilter?: string;
  /**
   * Define the prompt to be displayed when the command has continued beyond
   * the first line. Only used with command line.
   *
   * @default '>'
   */
  cmdContinuationPrompt?: string;
  /**
   * Define the line continuation string or character when using command line.
   */
  cmdContinuationStr?: string;
  /**
   * Define the host when using command line.
   */
  cmdHost?: string;
  /**
   * Define a custom prompt when using command line. By default, `#` will be
   * used for the root user and `$` for all other users.
   */
  cmdPrompt?: string;
  /**
   * Define the line(s) that must be presented as output when using command
   * line.
   *
   * @example '6' // a single line
   * @example '2-7' // a range
   * @example '3,9-11' // multiple lines with a range
   *
   * @default undefined
   */
  cmdOutput?: string;
  /**
   * Define a pattern to automatically present some lines as output when using
   * command line.
   *
   * @default undefined
   */
  cmdOutputFilter?: string;
  /**
   * Specify the user when using command line.
   */
  cmdUser?: string;
  /**
   * Define the line(s) that must be highlighted.
   *
   * DON'T USE: it seems the plugin is not correctly loaded.
   *
   * @example '6' // a single line
   * @example '2-7' // a range
   * @example '3,9-11' // multiple lines with a range
   *
   * @default undefined
   */
  highlight?: string;
  /**
   * Should the code be treated as command lines?
   *
   * @default false
   */
  isCmd?: boolean;
  /**
   * Should the code be treated as a diff block?
   *
   * @default false
   */
  isDiff?: boolean;
  /**
   * The code language.
   */
  language: PrismLanguage;
  /**
   * Define the starting line number. It will be ignored with command lines.
   *
   * @default undefined // Starts with 1.
   */
  start?: string;
};

const CodeWithRef: ForwardRefRenderFunction<HTMLElement, CodeProps> = (
  {
    children,
    className = '',
    cmdContinuationFilter,
    cmdContinuationPrompt,
    cmdContinuationStr,
    cmdHost,
    cmdOutput,
    cmdOutputFilter,
    cmdPrompt,
    cmdUser,
    highlight,
    isCmd = false,
    isDiff = false,
    language,
    start,
    ...props
  },
  ref
) => {
  const wrapperClass = `${styles.wrapper} ${className}`;
  const codeClass = isDiff
    ? `language-diff-${language}`
    : `language-${language}`;
  const plugins: PrismAvailablePlugin[] = [
    'toolbar',
    'autoloader',
    'show-language',
    'color-scheme',
    'copy-to-clipboard',
    'inline-color',
    'match-braces',
    'normalize-whitespace',
  ];

  if (isDiff || language === 'diff') plugins.push('diff-highlight');

  if (language.endsWith('treeview')) plugins.push('treeview');
  else plugins.push(isCmd ? 'command-line' : 'line-numbers');

  const { attributes: prismAttributes, className: prismClass } = usePrism({
    attributes: {
      'data-continuation-prompt': cmdContinuationPrompt,
      'data-continuation-str': cmdContinuationStr,
      'data-filter-continuation': cmdContinuationFilter,
      'data-filter-output': cmdOutputFilter,
      'data-host': cmdHost,
      'data-line': highlight,
      'data-output': cmdOutput,
      'data-prompt': cmdPrompt,
      'data-start': start,
      'data-toolbar-order': 'show-language,copy-to-clipboard,color-scheme',
      'data-user': cmdUser,
    },
    language,
    plugins,
  });

  return (
    <Figure {...props} className={wrapperClass} ref={ref}>
      <pre
        {...prismAttributes}
        className={prismClass}
        // cSpell:ignore noninteractive
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <code className={codeClass}>{children}</code>
      </pre>
    </Figure>
  );
};

/**
 * Code component
 *
 * Render a code block with syntax highlighting.
 *
 * @todo Find a way to load Prism plugins without Babel (Next uses SWC). It
 * seems some plugins are not loaded correctly (`line-highlight` or `treeview`
 * for example).
 */
export const Code = forwardRef(CodeWithRef);
