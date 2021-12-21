import sharingMedia from '@config/sharing';
import { t } from '@lingui/macro';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Sharing.module.scss';

type Parameters = {
  content: string;
  image: string;
  title: string;
  url: string;
};

type Website = {
  id: string;
  name: string;
  parameters: Parameters;
  url: string;
};

const Sharing = ({ excerpt, title }: { excerpt: string; title: string }) => {
  const [pageExcerpt, setPageExcerpt] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [hostname, setHostname] = useState('');
  const router = useRouter();

  useEffect(() => {
    const divEl = document.createElement('div');
    divEl.innerHTML = excerpt;
    const cleanExcerpt = divEl.textContent!;
    setPageExcerpt(cleanExcerpt);
  }, [excerpt]);

  useEffect(() => {
    const { protocol, hostname, port } = window.location;
    const fullUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}${
      router.asPath
    }`;

    setHostname(hostname);
    setPageUrl(fullUrl);
  }, [router.asPath]);

  const getSharingUrl = (website: Website): string => {
    const { id, parameters, url } = website;
    let sharingUrl = `${url}?`;
    let count = 0;

    for (const [key, value] of Object.entries(parameters)) {
      if (!value) continue;

      sharingUrl += count > 0 ? `&${value}=` : `${value}=`;

      switch (key) {
        case 'content':
          if (id === 'email') {
            const body = `${t`Introduction:`}\n\n"${pageExcerpt}"\n\n${t`Read more here:`} ${pageUrl}`;
            sharingUrl += encodeURI(body);
          } else {
            sharingUrl += encodeURI(pageExcerpt);
          }
          break;
        case 'title':
          const prefix = id === 'email' ? t`Seen on ${hostname}:` : '';
          sharingUrl += encodeURI(`${prefix} ${title}`);
          break;
        case 'url':
          sharingUrl += encodeURI(pageUrl);
        default:
          break;
      }

      count++;
    }

    return sharingUrl;
  };

  const getItems = () => {
    const websites: Website[] = sharingMedia;

    return websites.map((website) => {
      const { id, name } = website;
      const sharingUrl = getSharingUrl(website);

      return (
        <li key={id}>
          <a
            href={sharingUrl}
            className={`${styles.link} ${styles[`link--${id}`]}`}
          >
            {name}
          </a>
        </li>
      );
    });
  };

  return (
    <div>
      <h2>{t`Share`}</h2>
      <ul className={styles.list}>{getItems()}</ul>
    </div>
  );
};

export default Sharing;
