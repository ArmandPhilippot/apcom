import Spinner from '@components/Spinner/Spinner';
import { ExpandableWidget, List } from '@components/WidgetParts';
import { t } from '@lingui/macro';
import { getAllThematics } from '@services/graphql/queries';
import { TitleLevel } from '@ts/types/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ThematicsList = ({
  title,
  titleLevel,
}: {
  title: string;
  titleLevel?: TitleLevel;
}) => {
  const router = useRouter();
  const isThematic = () => router.asPath.includes('/thematique/');
  const currentThematicSlug = isThematic()
    ? router.asPath.replace('/thematique/', '')
    : '';

  const { data, error } = useSWR('/api/thematics', getAllThematics);

  const getList = () => {
    if (error) return <ul>{t`Failed to load.`}</ul>;
    if (!data)
      return (
        <ul>
          <Spinner />
        </ul>
      );

    const thematics = data.map((thematic) => {
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

    return <List items={thematics} />;
  };

  return (
    <ExpandableWidget title={title} titleLevel={titleLevel} withBorders={true}>
      {getList()}
    </ExpandableWidget>
  );
};

export default ThematicsList;
