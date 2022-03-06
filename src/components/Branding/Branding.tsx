import photo from '@assets/images/armand-philippot.jpg';
import { settings } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ReactElement, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Person, WithContext } from 'schema-dts';
import styles from './Branding.module.scss';
import Logo from './Logo/Logo';

type BrandingReturn = ({ isHome }: { isHome: boolean }) => ReactElement;

const Branding: BrandingReturn = ({ isHome = false }) => {
  const intl = useIntl();
  const { locale } = useRouter();
  const TitleTag = isHome ? 'h1' : 'p';
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const jobRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.style.setProperty(
        '--branding-logo-animation',
        'flip-logo 9s ease-in 0s 1'
      );
    }
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.setProperty(
        '--branding-name-animation',
        'blink 0.8s ease-in-out 0s 2, typing 4.3s linear 0s 1'
      );
    }
  }, []);

  useEffect(() => {
    if (jobRef.current) {
      jobRef.current.style.setProperty(
        '--branding-job-animation',
        'hide-text 4.25s linear 0s 1, blink 0.8s ease-in-out 4.25s 2, typing 3.8s linear 4.25s 1'
      );
    }
  }, []);

  const schemaJsonLd: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${settings.url}/#branding`,
    name: settings.name,
    url: settings.url,
    jobTitle: locale?.startsWith('en')
      ? settings.baseline.en
      : settings.baseline.fr,
    image: photo.src,
    subjectOf: { '@id': `${settings.url}` },
  };

  return (
    <>
      <Script
        id="schema-branding"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <div id="branding" className={styles.wrapper}>
        <div className={styles.logo} ref={logoRef}>
          <div className={styles.logo__front}>
            <Image
              src={photo}
              alt={intl.formatMessage(
                {
                  defaultMessage: '{brandingName} picture',
                  description: 'Branding: branding name picture.',
                },
                {
                  brandingName: settings.name,
                }
              )}
              layout="responsive"
            />
          </div>
          <div className={styles.logo__back}>
            <Logo />
          </div>
        </div>
        <TitleTag ref={titleRef} className={styles.name}>
          <Link href="/">
            <a className={styles.link}>{settings.name}</a>
          </Link>
        </TitleTag>
        <p ref={jobRef} className={styles.job}>
          {locale?.startsWith('en')
            ? settings.baseline.en
            : settings.baseline.fr}
        </p>
      </div>
    </>
  );
};

export default Branding;
