import GithubIcon from '@assets/images/social-media/github.svg';
import GitlabIcon from '@assets/images/social-media/gitlab.svg';
import { config } from '@config/website';
import { t } from '@lingui/macro';
import { ProjectMeta } from '@ts/types/app';
import { getFormattedDate } from '@utils/helpers/format';
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
  const router = useRouter();
  const locale = router.locale ? router.locale : config.locales.defaultLocale;
  const { data } = useGithubApi(repos?.github ? repos.github : '');

  return (
    <div className={styles.wrapper}>
      {cover && (
        <div className={styles.cover}>
          <Image
            src={cover}
            alt={t`${title} preview`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <dl className={styles.info}>
        {data && (
          <div className={styles.info__item}>
            <dt>{t`Created on`}</dt>
            <dd>
              <time dateTime={data.created_at}>
                {getFormattedDate(data.created_at, locale)}
              </time>
            </dd>
          </div>
        )}
        {data && (
          <div className={styles.info__item}>
            <dt>{t`Last updated on`}</dt>
            <dd>
              <time dateTime={data.updated_at}>
                {getFormattedDate(data.updated_at, locale)}
              </time>
            </dd>
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
