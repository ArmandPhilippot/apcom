import { MetaKind } from '@ts/types/app';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const CommentsCount = ({ total, kind }: { total: number; kind: MetaKind }) => {
  const intl = useIntl();
  const { asPath } = useRouter();

  const isArticle = () => asPath.includes('/article/');

  const getCommentsCount = () => {
    return intl.formatMessage(
      {
        defaultMessage:
          '{total, plural, =0 {No comments} one {# comment} other {# comments}}',
        description: 'CommentsCount: comment count value',
      },
      { total }
    );
  };

  return (
    <MetaItem
      title={intl.formatMessage({
        defaultMessage: 'Comments:',
        description: 'CommentsCount: comment count meta label',
      })}
      value={
        isArticle() ? (
          <a href="#comments">{getCommentsCount()}</a>
        ) : (
          getCommentsCount()
        )
      }
      kind={kind}
    />
  );
};

export default CommentsCount;
