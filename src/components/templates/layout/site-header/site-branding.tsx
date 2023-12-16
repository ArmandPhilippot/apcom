import NextImage from 'next/image';
import {
  type CSSProperties,
  forwardRef,
  type ForwardRefRenderFunction,
  useEffect,
  useRef,
} from 'react';
import { useIntl } from 'react-intl';
import { CONFIG } from '../../../../utils/config';
import { ROUTES } from '../../../../utils/constants';
import { Heading, Logo } from '../../../atoms';
import { Branding, FlippingLogo, type BrandingProps } from '../../../molecules';
import styles from './site-header.module.scss';

const brandingTitleStyles = {
  '--typing-animation': 'blink 0.7s ease-in-out 0s 2, typing 4.3s linear 0s 1',
} as CSSProperties;

const brandingBaselineStyles = {
  '--typing-animation':
    'hide-text 4.25s linear 0s 1, blink 0.8s ease-in-out 4.25s 2, typing 3.8s linear 4.25s 1',
} as CSSProperties;

export type SiteBrandingProps = Omit<
  BrandingProps,
  'baseline' | 'logo' | 'name' | 'url'
> & {
  isHome?: boolean;
};

const SiteBrandingWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  SiteBrandingProps
> = ({ isHome = false, ...props }, ref) => {
  const intl = useIntl();
  const isFirstRender = useRef(true);
  const photoAltText = intl.formatMessage(
    {
      defaultMessage: '{website} picture',
      description: 'SiteBranding: photo alternative text',
      id: 'dDwm38',
    },
    { website: CONFIG.name }
  );
  const logoTitle = intl.formatMessage(
    {
      defaultMessage: '{website} logo',
      description: 'SiteBranding: logo title',
      id: 'Vrw5/h',
    },
    { website: CONFIG.name }
  );

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <Branding
      {...props}
      baseline={
        <div className={styles.baseline} style={brandingBaselineStyles}>
          {CONFIG.baseline}
        </div>
      }
      logo={
        <FlippingLogo
          back={<Logo heading={logoTitle} />}
          className={styles.logo}
          front={
            <NextImage
              alt={photoAltText}
              height={120}
              // eslint-disable-next-line react/jsx-no-literals
              src="/armand-philippot.jpg"
              width={120}
            />
          }
        />
      }
      name={
        <Heading
          className={styles.title}
          isFake={!isHome}
          level={1}
          style={
            isFirstRender.current ? brandingTitleStyles : { animation: 'none' }
          }
        >
          {CONFIG.name}
        </Heading>
      }
      ref={ref}
      url={ROUTES.HOME}
    />
  );
};

export const SiteBranding = forwardRef(SiteBrandingWithRef);
