import { t } from '@lingui/macro';
import { SubjectPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import styles from '../Widget.module.scss';

const RelatedTopics = ({ topics }: { topics: SubjectPreview[] }) => {
  const sortedSubjects = [...topics].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const subjects = sortedSubjects.map((subject) => {
    return (
      <li key={subject.databaseId}>
        <Link href={`/sujet/${subject.slug}`}>
          <a>{subject.title}</a>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h2 className={styles.title}>
        {topics.length > 1 ? t`Related topics` : t`Related topic`}
      </h2>
      <ul className={styles.list}>{subjects}</ul>
    </div>
  );
};

export default RelatedTopics;
