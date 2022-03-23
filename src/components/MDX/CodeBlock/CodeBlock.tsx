import { useRouter } from 'next/router';
import Prism from 'prismjs';
import { ReactChildren, useEffect } from 'react';
import { useIntl } from 'react-intl';
import '@utils/plugins/prism-color-scheme';
import { usePrismTheme } from '@utils/providers/prism';

const CodeBlock = ({
  className,
  children,
}: {
  className: string;
  children: ReactChildren;
}) => {
  const classNames = className.split('+');
  const languageClass = classNames.find((name: string) =>
    name.startsWith('language-')
  );
  const intl = useIntl();
  const router = useRouter();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const { setCodeBlocks } = usePrismTheme();

  useEffect(() => {
    const allPre: NodeListOf<HTMLPreElement> = document.querySelectorAll(
      'pre[data-prismjs-color-scheme-current]'
    );
    setCodeBlocks(allPre);
  }, [setCodeBlocks, router.asPath]);

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

  return (
    <div
      data-prismjs-copy={copyText}
      data-prismjs-copy-success={copiedText}
      data-prismjs-copy-error={errorText}
      data-prismjs-color-scheme-dark={darkTheme}
      data-prismjs-color-scheme-light={lightTheme}
    >
      <pre className={classNames.join(' ')}>
        <code className={languageClass}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
