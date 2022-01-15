import { ExpandableWidget, List } from '@components/WidgetParts';
import { t } from '@lingui/macro';
import { getAllSubjects } from '@services/graphql/queries';
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

  const { data, error } = useSWR('/api/subjects', getAllSubjects);

  if (error) return <div>{t`Failed to load.`}</div>;
  if (!data) return <div>{t`Loading...`}</div>;

  const subjects = data.map((subject) => {
    return currentTopicSlug !== subject.slug ? (
      <li key={subject.databaseId}>
        <Link href={`/sujet/${subject.slug}`}>
          <a>{subject.title}</a>
        </Link>
      </li>
    ) : (
      ''
    );
  });

  return (
    <ExpandableWidget title={title} titleLevel={titleLevel} withBorders={true}>
      <List items={subjects} />
    </ExpandableWidget>
  );
};

export default TopicsList;
