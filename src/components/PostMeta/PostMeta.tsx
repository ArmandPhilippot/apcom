import {
  Author,
  CommentsCount,
  Dates,
  PostsCount,
  ReadingTime,
  Thematics,
  Topics,
  Website,
} from '@components/MetaItems';
import { MetaKind } from '@ts/types/app';
import { ArticleMeta } from '@ts/types/articles';
import { useRouter } from 'next/router';
import styles from './PostMeta.module.scss';

const PostMeta = ({
  meta,
  kind = 'list',
}: {
  meta: ArticleMeta;
  kind?: MetaKind;
}) => {
  const {
    author,
    commentCount,
    dates,
    readingTime,
    results,
    thematics,
    topics,
    website,
    wordsCount,
  } = meta;
  const { asPath } = useRouter();
  const isThematic = () => asPath.includes('/thematique/');

  const wrapperClass = styles[`wrapper--${kind}`];

  return (
    <dl className={wrapperClass}>
      {author && <Author name={author.name} kind={kind} />}
      {dates && (
        <Dates
          publication={dates.publication}
          update={dates.update}
          kind={kind}
        />
      )}
      {readingTime !== undefined && wordsCount !== undefined && (
        <ReadingTime time={readingTime} words={wordsCount} kind={kind} />
      )}
      {results && <PostsCount total={results} kind={kind} />}
      {!isThematic() && thematics && thematics.length > 0 && (
        <Thematics list={thematics} kind={kind} />
      )}
      {isThematic() && topics && topics.length > 0 && (
        <Topics list={topics} kind={kind} />
      )}
      {website && <Website url={website} kind={kind} />}
      {commentCount !== undefined && (
        <CommentsCount total={commentCount} kind={kind} />
      )}
    </dl>
  );
};

export default PostMeta;
