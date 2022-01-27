import { t } from '@lingui/macro';
import { Project } from '@ts/types/app';
import { slugify } from '@utils/helpers/slugify';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectPreview.module.scss';

const ProjectPreview = ({ project }: { project: Project }) => {
  const { id, meta, tagline, title } = project;

  return (
    <Link href={`/projet/${project.slug}`}>
      <a className={styles.link}>
        <article className={styles.article}>
          <header>
            {meta.hasCover && (
              <div className={styles.cover}>
                <Image
                  src={`/projects/${id}.jpg`}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  alt={t`${title} picture`}
                />
              </div>
            )}
            <h2 className={styles.title}>{title}</h2>
          </header>
          {tagline && (
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: tagline }}
            ></div>
          )}
          <footer className={styles.footer}>
            <dl className={styles.meta}>
              {meta.technologies && (
                <div className={styles.meta__item}>
                  <dt className="screen-reader-text">{t`Technologies:`}</dt>
                  {meta.technologies.map((techno) => (
                    <dd key={slugify(techno)} className={styles.techno}>
                      {techno}
                    </dd>
                  ))}
                </div>
              )}
            </dl>
          </footer>
        </article>
      </a>
    </Link>
  );
};

export default ProjectPreview;
