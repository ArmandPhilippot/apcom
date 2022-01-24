import GithubIcon from '@assets/images/social-media/github.svg';
import GitlabIcon from '@assets/images/social-media/gitlab.svg';
import { t } from '@lingui/macro';
import { ProjectMeta } from '@ts/types/app';
import { slugify } from '@utils/helpers/slugify';
import useGithubApi from '@utils/hooks/useGithubApi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './ProjectSummary.module.scss';

const ProjectSummary = ({
  title,
  cover,
  meta,
}: {
  title: string;
  cover: string;
  meta: ProjectMeta;
}) => {
  const { license, repos, technologies } = meta;
  const { locale } = useRouter();
  const { data } = useGithubApi(repos?.github ? repos.github : '');

  const getFormattedDate = (date: string) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return new Date(date).toLocaleDateString(locale, dateOptions);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cover}>
        <Image
          src={cover}
          alt={t`${title} preview`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <dl className={styles.info}>
        {data && (
          <div className={styles.info__item}>
            <dt>{t`Created on`}</dt>
            <dd>{t`${getFormattedDate(data.created_at)}`}</dd>
          </div>
        )}
        {data && (
          <div className={styles.info__item}>
            <dt>{t`Last updated on`}</dt>
            <dd>{t`${getFormattedDate(data.updated_at)}`}</dd>
          </div>
        )}
        <div className={styles.info__item}>
          <dt>{t`License`}</dt>
          <dd>{license}</dd>
        </div>
        {technologies && (
          <div className={styles.info__item}>
            <dt>{t`Technologies`}</dt>
            {technologies.map((techno) => (
              <dd
                key={slugify(techno)}
                className={`${styles.techno} ${styles['inline-data']}`}
              >
                {techno}
              </dd>
            ))}
          </div>
        )}
        {repos && (
          <div className={styles.info__item}>
            <dt>{t`Repositories`}</dt>
            {repos.github && (
              <dd className={styles['inline-data']}>
                <a
                  href={`https://github.com/${repos.github}`}
                  className={styles.repo}
                >
                  <GithubIcon />
                  <span className="screen-reader-text">Github</span>
                </a>
              </dd>
            )}
            {repos.gitlab && (
              <dd className={styles['inline-data']}>
                <a
                  href={`https://gitlab.com/${repos.gitlab}`}
                  className={styles.repo}
                >
                  <GitlabIcon />
                  <span className="screen-reader-text">Gitlab</span>
                </a>
              </dd>
            )}
          </div>
        )}
        {data && repos && (
          <div>
            <dt>{t`Popularity`}</dt>
            {repos.github && (
              <dd>
                ⭐&nbsp;
                <a href={`https://github.com/${repos.github}/stargazers`}>
                  {t`${data.stargazers_count} stars on Github`}
                </a>
              </dd>
            )}
          </div>
        )}
      </dl>
    </div>
  );
};

export default ProjectSummary;
