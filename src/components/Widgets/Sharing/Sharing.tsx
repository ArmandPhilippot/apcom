import { ExpandableWidget } from '@components/WidgetParts';
import sharingMedia from '@config/sharing';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
  const [pageExcerpt, setPageExcerpt] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [domainName, setDomainName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const divEl = document.createElement('div');
    divEl.innerHTML = excerpt;
    const cleanExcerpt = divEl.textContent!;
    setPageExcerpt(cleanExcerpt);
  }, [excerpt]);

  useEffect(() => {
    const { protocol, hostname, port } = window.location;
    const currentPort = port ? `:${port}` : '';
    const fullUrl = `${protocol}//${hostname}${currentPort}${router.asPath}`;

    setDomainName(hostname);
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
            const intro = intl.formatMessage({
              defaultMessage: 'Introduction:',
              description: 'Sharing: email content prefix',
            });
            const readMore = intl.formatMessage({
              defaultMessage: 'Read more here:',
              description: 'Sharing: content link prefix',
            });
            const body = `${intro}\n\n"${pageExcerpt}"\n\n${readMore} ${pageUrl}`;
            sharingUrl += encodeURI(body);
          } else {
            sharingUrl += encodeURI(pageExcerpt);
          }
          break;
        case 'title':
          const prefix =
            id === 'email'
              ? intl.formatMessage(
                  {
                    defaultMessage: 'Seen on {domainName}:',
                    description: 'Sharing: seen on text',
                  },
                  { domainName }
                )
              : '';
          sharingUrl += encodeURI(`${prefix} ${title}`);
          break;
        case 'url':
          sharingUrl += encodeURI(pageUrl);
          break;
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
      const linkModifier = `link--${id}`;

      return (
        <li key={id}>
          <a
            href={sharingUrl}
            title={name}
            className={`${styles.link} ${styles[linkModifier]}`}
          >
            <span className="screen-reader-text">
              {intl.formatMessage(
                {
                  defaultMessage: 'Share on {name}',
                  description: 'Sharing: share on social network text',
                },
                { name }
              )}
            </span>
          </a>
        </li>
      );
    });
  };

  return (
    <ExpandableWidget
      title={intl.formatMessage({
        defaultMessage: 'Share',
        description: 'Sharing: widget title',
      })}
      expand={true}
    >
      <ul className={`${styles.list} ${styles['list--sharing']}`}>
        {getItems()}
      </ul>
    </ExpandableWidget>
  );
};

export default Sharing;
