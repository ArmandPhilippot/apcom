import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import {
  PRISM_THEME_ATTRIBUTE,
  STORAGE_KEY,
  VALID_THEMES,
} from '../utils/constants';

const validPrismThemesStr = VALID_THEMES.map((t) => `"${t}"`);

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
        <Script
          dangerouslySetInnerHTML={{
            __html: `!function(){const e=localStorage.getItem("${STORAGE_KEY.THEME}"),t="string"==typeof e?JSON.parse(e):void 0,o=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",c=e&&["dark","light"].includes(t)?t:o;document.documentElement.setAttribute("data-${STORAGE_KEY.THEME}",c),document.documentElement.style.colorScheme=o}();`,
          }}
          // eslint-disable-next-line react/jsx-no-literals
          id="theme-hydration"
          // eslint-disable-next-line react/jsx-no-literals
          strategy="beforeInteractive"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `!function(){const t=localStorage.getItem("${STORAGE_KEY.PRISM}"),e="string"==typeof t?JSON.parse(t):void 0,s=e&&[${validPrismThemesStr}].includes(e)?e:"system";document.documentElement.setAttribute("${PRISM_THEME_ATTRIBUTE}",s)}();`,
          }}
          // eslint-disable-next-line react/jsx-no-literals
          id="prism-theme-hydration"
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
