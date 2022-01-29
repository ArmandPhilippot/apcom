import photo from '@assets/images/armand-philippot.jpg';
import { config } from '@config/website';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { Person, WithContext } from 'schema-dts';
import styles from './Branding.module.scss';
import Logo from './Logo/Logo';

type BrandingReturn = ({ isHome }: { isHome: boolean }) => ReactElement;

const Branding: BrandingReturn = ({ isHome = false }) => {
  const intl = useIntl();
  const TitleTag = isHome ? 'h1' : 'p';

  const schemaJsonLd: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${config.url}/#branding`,
    name: config.name,
    url: config.url,
    jobTitle: config.baseline,
    image: photo.src,
    subjectOf: { '@id': `${config.url}` },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <div id="branding" className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.logo__front}>
            <Image
              src={photo}
              alt={intl.formatMessage(
                {
                  defaultMessage: '{brandingName} picture',
                  description: 'Branding: branding name picture.',
                },
                {
                  brandingName: config.name,
                }
              )}
              layout="responsive"
            />
          </div>
          <div className={styles.logo__back}>
            <Logo />
          </div>
        </div>
        <TitleTag className={styles.name}>
          <Link href="/">
            <a className={styles.link}>{config.name}</a>
          </Link>
        </TitleTag>
        <p className={styles.job}>{config.baseline}</p>
      </div>
    </>
  );
};

export default Branding;
