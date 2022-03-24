import { MetaKind } from '@ts/types/app';
import { TopicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const Topics = ({ list, kind }: { list: TopicPreview[]; kind: MetaKind }) => {
  const intl = useIntl();

  const getTopics = () => {
    return list.map((topic) => {
      return (
        <Link key={topic.databaseId} href={`/sujet/${topic.slug}`}>
          <a>{topic.title}</a>
        </Link>
      );
    });
  };

  return (
    <MetaItem
      title={intl.formatMessage(
        {
          defaultMessage:
            '{topicsCount, plural, =0 {Topics:} one {Topic:} other {Topics:}}',
          description: 'Topics: topics list meta label',
          id: '0pp/IQ',
        },
        { topicsCount: list.length }
      )}
      values={getTopics()}
      kind={kind}
    />
  );
};

export default Topics;
