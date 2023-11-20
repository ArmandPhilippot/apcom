import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { useIntl } from 'react-intl';
import type { PageLink } from '../../../types';
import { getReadingTimeFrom } from '../../../utils/helpers';
import { Header, Heading, type HeaderProps, Link, Time } from '../../atoms';
import { MetaList, MetaItem } from '../../molecules';
import styles from './page.module.scss';

export type PageHeaderMetaData = {
  author: string;
  publicationDate: string;
  thematics: PageLink[];
  total: number;
  updateDate: string;
  website: string;
  wordsCount: number;
};

export type PageHeaderProps = Omit<HeaderProps, 'children'> & {
  /**
   * The page main title.
   */
  heading: ReactNode;
  /**
   * The page introduction.
   */
  intro?: ReactNode;
  /**
   * The page meta.
   */
  meta?: Partial<PageHeaderMetaData>;
};

const PageHeaderWithRef: ForwardRefRenderFunction<
  HTMLElement,
  PageHeaderProps
> = ({ className = '', heading, intro, meta, ...props }, ref) => {
  const headerClass = `${styles.header} ${className}`;
  const intl = useIntl();

  return (
    <Header {...props} className={headerClass} ref={ref}>
      <div className={styles.header__body}>
        <Heading className={styles.heading} level={1}>
          {heading}
        </Heading>
        {meta ? (
          <MetaList className={styles.meta}>
            {meta.author ? (
              <MetaItem
                isInline
                label={intl.formatMessage({
                  defaultMessage: 'Written by:',
                  description: 'PageHeader: author meta label',
                  id: '/unaGZ',
                })}
                value={meta.author}
              />
            ) : null}
            {meta.publicationDate ? (
              <MetaItem
                isInline
                label={intl.formatMessage({
                  defaultMessage: 'Published on:',
                  description: 'PageHeader: publication date label',
                  id: 'pUBhKy',
                })}
                value={<Time date={meta.publicationDate} />}
              />
            ) : null}
            {meta.updateDate && meta.updateDate !== meta.publicationDate ? (
              <MetaItem
                isInline
                label={intl.formatMessage({
                  defaultMessage: 'Updated on:',
                  description: 'PageHeader: update date label',
                  id: 'sR5hah',
                })}
                value={<Time date={meta.updateDate} />}
              />
            ) : null}
            {meta.wordsCount ? (
              <MetaItem
                isInline
                label={intl.formatMessage({
                  defaultMessage: 'Reading time:',
                  description: 'PageHeader: reading time label',
                  id: 'jJm8wd',
                })}
                value={intl.formatMessage(
                  {
                    defaultMessage:
                      '{minutesCount, plural, =0 {Less than one minute} one {# minute} other {# minutes}}',
                    description: 'PageHeader: rounded minutes count',
                    id: 'NNDqRg',
                  },
                  {
                    minutesCount: getReadingTimeFrom(
                      meta.wordsCount
                    ).inMinutes(),
                  }
                )}
              />
            ) : null}
            {meta.thematics ? (
              <MetaItem
                isInline
                label={intl.formatMessage(
                  {
                    defaultMessage:
                      '{thematicsCount, plural, =0 {Thematics:} one {Thematic:} other {Thematics:}}',
                    description: 'PageHeader: thematics label',
                    id: 'ODwkBI',
                  },
                  { thematicsCount: meta.thematics.length }
                )}
                value={meta.thematics.map((thematic) => {
                  return {
                    id: `thematic-${thematic.id}`,
                    value: <Link href={thematic.url}>{thematic.name}</Link>,
                  };
                })}
              />
            ) : null}
            {meta.total ? (
              <MetaItem
                isInline
                label={intl.formatMessage({
                  defaultMessage: 'Total:',
                  description: 'PageHeader: total meta label',
                  id: 'a6DzIj',
                })}
                value={intl.formatMessage(
                  {
                    defaultMessage:
                      '{postsCount, plural, =0 {No posts} one {# post} other {# posts}}',
                    description: 'PageHeader: total meta value',
                    id: 'bAXtMT',
                  },
                  { postsCount: meta.total }
                )}
              />
            ) : null}
            {meta.website ? (
              <MetaItem
                isInline
                label={intl.formatMessage({
                  defaultMessage: 'Website:',
                  description: 'PageHeader: website meta label',
                  id: '9jh0r2',
                })}
                value={meta.website}
              />
            ) : null}
          </MetaList>
        ) : null}
        {typeof intro === 'string' ? (
          // eslint-disable-next-line react/no-danger -- Intro can contain tags.
          <div dangerouslySetInnerHTML={{ __html: intro }} />
        ) : (
          intro
        )}
      </div>
    </Header>
  );
};

export const PageHeader = forwardRef(PageHeaderWithRef);
