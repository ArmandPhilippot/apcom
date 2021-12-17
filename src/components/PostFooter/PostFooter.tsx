import { t } from '@lingui/macro';
import { SubjectPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import styles from './PostFooter.module.scss';

const PostFooter = ({ subjects }: { subjects: SubjectPreview[] }) => {
  const getSubjects = () => {
    return subjects.map((subject) => {
      return (
        <li key={subject.id}>
          <Link href={`/sujet/${subject.slug}`}>
            <a>{subject.title}</a>
          </Link>
        </li>
      );
    });
  };

  return (
    <footer>
      {subjects.length > 0 && (
        <>
          <dl className={styles.meta}>
            <dt>{t`Subjects:`}</dt>
            <dd>
              <ul className={styles.list}>{getSubjects()}</ul>
            </dd>
          </dl>
        </>
      )}
    </footer>
  );
};

export default PostFooter;
