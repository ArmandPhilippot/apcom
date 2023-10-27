import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { STORAGE_KEY } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/no-shadow -- Required by NextJs
export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `!function(){const t=localStorage.getItem("${STORAGE_KEY.MOTION}"),e="string"==typeof t&&"true"===t;document.documentElement.setAttribute("data-${STORAGE_KEY.MOTION}",e)}();`,
          }}
          // eslint-disable-next-line react/jsx-no-literals
          id="motion-hydration"
          // eslint-disable-next-line react/jsx-no-literals
          strategy="beforeInteractive"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
