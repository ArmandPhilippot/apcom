import usePrism, {
  type OptionalPrismPlugin,
  type PrismLanguage,
} from '@utils/hooks/use-prism';
import { FC, useRef } from 'react';
import styles from './code.module.scss';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { attributes, className } = usePrism({ language, plugins });

  const outputAttribute = filterOutput
    ? { 'data-filter-output': outputPattern }
    : {};

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <pre
        className={className}
        tabIndex={0}
        {...attributes}
        {...outputAttribute}
      >
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};

export default Code;
