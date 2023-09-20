import { FC, useRef } from 'react';
import {
  type OptionalPrismPlugin,
  type PrismLanguage,
  usePrism,
} from '../../../utils/hooks';
import styles from './code.module.scss';

export type CodeProps = {
  /**
   * An accessible name.
   */
  'aria-label'?: string;
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
export const Code: FC<CodeProps> = ({
  children,
  filterOutput = false,
  language,
  plugins = [],
  outputPattern = '#output#',
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { attributes, className } = usePrism({ language, plugins });

  const outputAttribute = filterOutput
    ? { 'data-filter-output': outputPattern }
    : {};

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <pre
        {...props}
        {...attributes}
        {...outputAttribute}
        className={className}
        tabIndex={0}
      >
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};
