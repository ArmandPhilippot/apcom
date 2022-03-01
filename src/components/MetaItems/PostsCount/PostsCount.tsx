import { MetaKind } from '@ts/types/app';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const PostsCount = ({ total, kind }: { total: number; kind: MetaKind }) => {
  const intl = useIntl();

  return (
    <MetaItem
      title={intl.formatMessage({
        defaultMessage: 'Total:',
        description: 'PostCount: total found articles meta label',
      })}
      value={intl.formatMessage(
        {
          defaultMessage:
            '{total, plural, =0 {No articles} one {# article} other {# articles}}',
          description: 'PostCount: total found articles',
        },
        { total }
      )}
      kind={kind}
    />
  );
};

export default PostsCount;
