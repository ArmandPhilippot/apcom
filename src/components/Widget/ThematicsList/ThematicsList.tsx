import { t } from '@lingui/macro';
import { getAllThematics } from '@services/graphql/queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from './ThematicsList.module.scss';

const ThematicsList = ({ title }: { title: string }) => {
  const router = useRouter();
  const isThematic = () => router.asPath.includes('/thematique/');
  const currentThematicSlug = isThematic()
    ? router.asPath.replace('/thematique/', '')
    : '';

  const { data, error } = useSWR('/api/thematics', getAllThematics);

  if (error) return <div>{t`Failed to load.`}</div>;
  if (!data) return <div>{t`Loading...`}</div>;

  const sortedThematics = [...data].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const thematics = sortedThematics.map((thematic) => {
    return currentThematicSlug !== thematic.slug ? (
      <li key={thematic.databaseId}>
        <Link href={`/thematique/${thematic.slug}`}>
          <a>{thematic.title}</a>
        </Link>
      </li>
    ) : (
      ''
    );
  });

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>{thematics}</ul>
    </div>
  );
};

export default ThematicsList;
