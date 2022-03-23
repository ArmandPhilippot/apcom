import {
  PrismDefaultPlugins,
  PrismLanguages,
  PrismPlugins,
} from '@ts/types/prism';
import { usePrismTheme } from '@utils/providers/prism-theme';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

const CodeBlock = ({
  code,
  language,
  plugins,
}: {
  code: string;
  language: PrismLanguages;
  plugins: PrismPlugins[];
}) => {
  const intl = useIntl();
  const router = useRouter();
  const { setCodeBlocks } = usePrismTheme();

  useEffect(() => {
    const allPre: NodeListOf<HTMLPreElement> = document.querySelectorAll(
      'pre[data-prismjs-color-scheme-current]'
    );
    setCodeBlocks(allPre);
  }, [setCodeBlocks, router.asPath]);

  const defaultPlugins: PrismDefaultPlugins[] = useMemo(
    () => [
      'autoloader',
      'toolbar',
      'show-language',
      'copy-to-clipboard',
      'color-scheme',
      'match-braces',
      'normalize-whitespace',
    ],
    []
  );

  const loadPrismPlugins = useCallback(
    async (prismPlugins: (PrismDefaultPlugins | PrismPlugins)[]) => {
      for (const plugin of prismPlugins) {
        try {
          if (plugin === 'color-scheme') {
            await import(`@utils/plugins/prism-${plugin}`);
          } else {
            await import(`prismjs/plugins/${plugin}/prism-${plugin}.min.js`);

            if (plugin === 'autoloader')
              Prism.plugins.autoloader.languages_path = '/prism/';
          }
        } catch (error) {
          console.error('CodeBlock: an error occurred with Prism.');
          console.error(error);
        }
      }
    },
    []
  );

  useEffect(() => {
    loadPrismPlugins([...defaultPlugins, ...plugins]).then(() => {
      Prism.highlightAll();
    });
  }, [loadPrismPlugins, defaultPlugins, plugins]);

  const copyText = intl.formatMessage({
    defaultMessage: 'Copy',
    description: 'Prism: copy button text (no clicked)',
    id: '/ly3AC',
  });
  const copiedText = intl.formatMessage({
    defaultMessage: 'Copied!',
    description: 'Prism: copy button text (clicked)',
    id: 'OV9r1K',
  });
  const errorText = intl.formatMessage({
    defaultMessage: 'Use Ctrl+c to copy',
    description: 'Prism: error text',
    id: 'z9qkcQ',
  });
  const darkTheme = intl.formatMessage({
    defaultMessage: 'Dark Theme 🌙',
    description: 'Prism: toggle dark theme button text',
    id: 'nFMdWI',
  });
  const lightTheme = intl.formatMessage({
    defaultMessage: 'Light Theme 🌞',
    description: 'Prism: toggle light theme button text',
    id: 'Ua2g2p',
  });

  const defaultPluginsClasses = 'match-braces';
  const pluginsClasses = plugins.join(' ');

  return (
    <pre
      className={`language-${language} ${defaultPluginsClasses} ${pluginsClasses}`}
      data-prismjs-copy={copyText}
      data-prismjs-copy-success={copiedText}
      data-prismjs-copy-error={errorText}
      data-prismjs-color-scheme-dark={darkTheme}
      data-prismjs-color-scheme-light={lightTheme}
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
