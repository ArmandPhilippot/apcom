import Spinner from '@components/Spinner/Spinner';
import { ExpandableWidget, List } from '@components/WidgetParts';
import { t } from '@lingui/macro';
import { getAllTopics } from '@services/graphql/queries';
import { TitleLevel } from '@ts/types/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const TopicsList = ({
  title,
  titleLevel,
}: {
  title: string;
  titleLevel?: TitleLevel;
}) => {
  const router = useRouter();
  const isTopic = () => router.asPath.includes('/sujet/');
  const currentTopicSlug = isTopic()
    ? router.asPath.replace('/sujet/', '')
    : '';

  const { data, error } = useSWR('/api/topics', getAllTopics);

  const getList = () => {
    if (error) return <ul>{t`Failed to load.`}</ul>;
    if (!data)
      return (
        <ul>
          <Spinner />
        </ul>
      );

    const topics = data.map((topic) => {
      return currentTopicSlug !== topic.slug ? (
        <li key={topic.databaseId}>
          <Link href={`/sujet/${topic.slug}`}>
            <a>{topic.title}</a>
          </Link>
        </li>
      ) : (
        ''
      );
    });

    return <List items={topics} />;
  };

  return (
    <ExpandableWidget title={title} titleLevel={titleLevel} withBorders={true}>
      {getList()}
    </ExpandableWidget>
  );
};

export default TopicsList;
