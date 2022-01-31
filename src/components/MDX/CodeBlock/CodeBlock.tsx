import { settings } from '@utils/config';
import { translateCopyButton } from '@utils/helpers/prism';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import { ReactChildren, useEffect } from 'react';
import { useIntl } from 'react-intl';
import '@utils/plugins/prism-color-scheme';

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

  return (
    <div>
      <pre className={classNames.join(' ')}>
        <code className={languageClass}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
