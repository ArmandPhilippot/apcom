import Spinner from '@components/Spinner/Spinner';
import { ExpandableWidget, List } from '@components/WidgetParts';
import { getAllTopics } from '@services/graphql/queries';
import { TitleLevel } from '@ts/types/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useSWR from 'swr';

const TopicsList = ({
  title,
  titleLevel,
}: {
  title: string;
  titleLevel?: TitleLevel;
}) => {
  const intl = useIntl();
  const router = useRouter();
  const isTopic = () => router.asPath.includes('/sujet/');
  const currentTopicSlug = isTopic()
    ? router.asPath.replace('/sujet/', '')
    : '';

  const { data, error } = useSWR('/api/topics', getAllTopics);

  const getList = () => {
    if (error)
      return (
        <ul>
          {intl.formatMessage({
            defaultMessage: 'Failed to load.',
            description: 'TopicsList: failed to load text',
          })}
        </ul>
      );
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
    <ExpandableWidget
      title={title}
      titleLevel={titleLevel}
      withBorders={true}
      expand={true}
    >
      <noscript>
        {intl.formatMessage({
          defaultMessage: 'Javascript is required to load the topics.',
          description: 'TopicsList: noscript tag',
        })}
      </noscript>
      {getList()}
    </ExpandableWidget>
  );
};

export default TopicsList;
