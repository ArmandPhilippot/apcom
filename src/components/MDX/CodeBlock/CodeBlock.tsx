import { settings } from '@utils/config';
import { translateCopyButton } from '@utils/helpers/prism';
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
  const locale = router.locale ? router.locale : settings.locales.defaultLocale;

  useEffect(() => {
    Prism.highlightAll();
  });

  useEffect(() => {
    translateCopyButton(locale, intl);
  }, [intl, locale]);

  const { setCodeBlocks } = usePrismTheme();

  useEffect(() => {
    const allPre: NodeListOf<HTMLPreElement> = document.querySelectorAll(
      'pre[data-prismjs-color-scheme'
    );
    setCodeBlocks(allPre);
  }, [setCodeBlocks, router.asPath]);

  return (
    <div>
      <pre className={classNames.join(' ')}>
        <code className={languageClass}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
