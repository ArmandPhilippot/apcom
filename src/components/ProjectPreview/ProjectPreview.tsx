import { t } from '@lingui/macro';
import { Project } from '@ts/types/app';
import { slugify } from '@utils/helpers/slugify';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectPreview.module.scss';

const ProjectPreview = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projet/${project.slug}`}>
      <a className={styles.link}>
        <article className={styles.article}>
          <header>
            {project.cover && (
              <div className={styles.cover}>
                <Image
                  src={project.cover}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  alt={t`${project.title} picture`}
                />
              </div>
            )}
            <h2 className={styles.title}>{project.title}</h2>
          </header>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: project.intro }}
          ></div>
          <footer>
            <dl className={styles.meta}>
              {project.meta.license && (
                <div className={styles.meta__item}>
                  <dt>{t`License:`}</dt>
                  <dd>{project.meta.license}</dd>
                </div>
              )}
              {project.meta.technologies && (
                <div className={styles.meta__item}>
                  <dt>{t`Technologies:`}</dt>
                  {project.meta.technologies.map((techno) => (
                    <dd key={slugify(techno)}>{techno}</dd>
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
