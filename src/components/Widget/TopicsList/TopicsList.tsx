import { t } from '@lingui/macro';
import { getAllSubjects } from '@services/graphql/queries';
import Link from 'next/link';
import useSWR from 'swr';
import styles from './TopicsList.module.scss';

const TopicsList = () => {
  const { data, error } = useSWR('/api/subjects', getAllSubjects);

  if (error) return <div>{t`Failed to load.`}</div>;
  if (!data) return <div>{t`Loading...`}</div>;

  const sortedSubjects = [...data].sort((a, b) =>
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
      <h2 className={styles.title}>{t`Topics`}</h2>
      <ul className={styles.list}>{subjects}</ul>
    </div>
  );
};

export default TopicsList;
