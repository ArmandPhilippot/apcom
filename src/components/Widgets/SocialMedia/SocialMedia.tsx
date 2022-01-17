import { socialWebsites } from '@config/social-media';
import GithubIcon from '@assets/images/social-media/github.svg';
import GitlabIcon from '@assets/images/social-media/gitlab.svg';
import LinkedInIcon from '@assets/images/social-media/linkedin.svg';
import TwitterIcon from '@assets/images/social-media/twitter.svg';
import styles from './SocialMedia.module.scss';
import { ExpandableWidget } from '@components/WidgetParts';

const SocialMedia = ({
  title,
  github = false,
  gitlab = false,
  linkedin = false,
  twitter = false,
}: {
  title: string;
  github?: boolean;
  gitlab?: boolean;
  linkedin?: boolean;
  twitter?: boolean;
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'github':
        return <GithubIcon className={styles.icon} />;
      case 'gitlab':
        return <GitlabIcon className={styles.icon} />;
      case 'linkedin':
        return <LinkedInIcon className={styles.icon} />;
      case 'twitter':
        return <TwitterIcon className={styles.icon} />;
      default:
        break;
    }
  };

  const shouldDisplayLink = (id: string) => {
    switch (id) {
      case 'github':
        return github;
      case 'gitlab':
        return gitlab;
      case 'linkedin':
        return linkedin;
      case 'twitter':
        return twitter;
      default:
        break;
    }
  };

  const items = socialWebsites.map((website) => {
    return shouldDisplayLink(website.id) ? (
      <li key={website.id}>
        <a href={website.url} className={styles.link}>
          {getIcon(website.id)}
          <span className="screen-reader-text">{website.name}</span>
        </a>
      </li>
    ) : (
      ''
    );
  });

  return (
    <ExpandableWidget title={title} expand={true}>
      <ul className={styles.list}>{items}</ul>
    </ExpandableWidget>
  );
};

export default SocialMedia;
