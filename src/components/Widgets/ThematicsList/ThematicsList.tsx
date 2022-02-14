import Spinner from '@components/Spinner/Spinner';
import { ExpandableWidget, List } from '@components/WidgetParts';
import { getAllThematics } from '@services/graphql/queries';
import { TitleLevel } from '@ts/types/app';
import { ThematicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useSWR from 'swr';

const ThematicsList = ({
  title,
  titleLevel,
  initialData,
}: {
  title: string;
  titleLevel?: TitleLevel;
  initialData?: ThematicPreview[];
}) => {
  const intl = useIntl();
  const router = useRouter();
  const isThematic = () => router.asPath.includes('/thematique/');
  const currentThematicSlug = isThematic()
    ? router.asPath.replace('/thematique/', '')
    : '';

  const { data, error } = useSWR('/api/thematics', getAllThematics, {
    fallbackData: initialData,
  });

  const getList = () => {
    if (error)
      return (
        <ul>
          {intl.formatMessage({
            defaultMessage: 'Failed to load.',
            description: 'ThematicsList: failed to load text',
          })}
        </ul>
      );
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
    <ExpandableWidget
      title={title}
      titleLevel={titleLevel}
      withBorders={true}
      expand={true}
    >
      {getList()}
    </ExpandableWidget>
  );
};

export default ThematicsList;
