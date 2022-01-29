import { ButtonLink } from '@components/Buttons';
import Copyright from '@components/Copyright/Copyright';
import FooterNav from '@components/FooterNav/FooterNav';
import { ArrowIcon } from '@components/Icons';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './Footer.module.scss';

const Footer = () => {
  const intl = useIntl();
  const [backToTopClasses, setBackToTopClasses] = useState(
    `${styles['back-to-top']} ${styles['back-to-top--hidden']}`
  );

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 300) {
      setBackToTopClasses(
        `${styles['back-to-top']} ${styles['back-to-top--visible']}`
      );
    } else {
      setBackToTopClasses(
        `${styles['back-to-top']} ${styles['back-to-top--hidden']}`
      );
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={styles.wrapper}>
      <Copyright />
      <FooterNav />
      <div className={backToTopClasses}>
        <ButtonLink target="#top" position="center">
          <span className="screen-reader-text">
            {intl.formatMessage({
              defaultMessage: 'Back to top',
              description: 'Footer: Back to top button',
            })}
          </span>
          <ArrowIcon direction="top" />
        </ButtonLink>
      </div>
    </footer>
  );
};

export default Footer;
