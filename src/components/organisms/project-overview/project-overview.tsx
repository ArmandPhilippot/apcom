import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
  useCallback,
  type ReactElement,
} from 'react';
import { useIntl } from 'react-intl';
import type { ValueOf } from '../../../types';
import {
  Time,
  type SocialWebsite,
  Link,
  SocialLink,
  Figure,
} from '../../atoms';
import { MetaItem, type MetaItemProps, MetaList } from '../../molecules';
import styles from './project-overview.module.scss';

export type Repository = {
  id: Extract<SocialWebsite, 'Github' | 'Gitlab'>;
  label: string;
  url: string;
};

export type ProjectPopularity = {
  count: number;
  url?: string;
};

export type ProjectMeta = {
  creationDate: string;
  lastUpdateDate: string;
  license: string;
  popularity: ProjectPopularity;
  repositories: Repository[];
  technologies: string[];
};

const validMeta = [
  'creationDate',
  'lastUpdateDate',
  'license',
  'popularity',
  'repositories',
  'technologies',
] satisfies (keyof ProjectMeta)[];

const isValidMetaKey = (key: string): key is keyof ProjectMeta =>
  (validMeta as string[]).includes(key);

export type ProjectOverviewProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * The project cover.
   */
  cover?: ReactElement;
  /**
   * The project meta.
   */
  meta: Partial<ProjectMeta>;
  /**
   * The project name.
   */
  name: string;
};

const ProjectOverviewWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  ProjectOverviewProps
> = ({ className = '', cover, meta, name, ...props }, ref) => {
  const wrapperClass = `${styles.wrapper} ${className}`;
  const intl = useIntl();
  const coverLabel = intl.formatMessage(
    {
      defaultMessage: 'Illustration of {projectName}',
      description: 'ProjectOverview: cover accessible name',
      id: '701ggm',
    },
    { projectName: name }
  );
  const metaLabels = {
    creationDate: intl.formatMessage({
      defaultMessage: 'Created on:',
      description: 'ProjectOverview: creation date label',
      id: 'c0Oecl',
    }),
    lastUpdateDate: intl.formatMessage({
      defaultMessage: 'Updated on:',
      description: 'ProjectOverview: update date label',
      id: 'JbT+fA',
    }),
    license: intl.formatMessage({
      defaultMessage: 'License:',
      description: 'ProjectOverview: license label',
      id: 'QtdnFV',
    }),
    popularity: intl.formatMessage({
      defaultMessage: 'Popularity:',
      description: 'ProjectOverview: popularity label',
      id: 'cIAOyy',
    }),
    repositories: intl.formatMessage({
      defaultMessage: 'Repositories:',
      description: 'ProjectOverview: repositories label',
      id: '3bKzk0',
    }),
    technologies: intl.formatMessage({
      defaultMessage: 'Technologies:',
      description: 'ProjectOverview: technologies label',
      id: 'OWkqXt',
    }),
  } satisfies Record<keyof ProjectMeta, string>;

  const getMetaValue = useCallback(
    (key: keyof ProjectMeta, value: ValueOf<ProjectMeta>) => {
      if (typeof value === 'string') {
        return key === 'license' ? value : <Time date={value} />;
      }

      if (
        (value instanceof Object || typeof value === 'object') &&
        !Array.isArray(value)
      ) {
        const stars = intl.formatMessage(
          {
            defaultMessage:
              '{starsCount, plural, =0 {No stars} one {# star} other {# stars}}',
            description: 'ProjectOverview: stars count',
            id: 'PBdVsm',
          },
          { starsCount: value.count }
        );

        return value.url ? (
          <>
            ⭐&nbsp;<Link href={value.url}>{stars}</Link>
          </>
        ) : (
          `⭐\u00A0${stars}`
        );
      }

      return value.map((v) => {
        if (typeof v === 'string') return { id: v, value: v };

        return {
          id: v.id,
          value: <SocialLink icon={v.id} label={v.label} url={v.url} />,
        };
      });
    },
    [intl]
  );

  const getMetaItems = useCallback(() => {
    const keys = Object.keys(meta).filter(isValidMetaKey);

    return keys
      .map((key) => {
        const value = meta[key];

        return value ? (
          <MetaItem
            hasBorderedValues={key === 'technologies'}
            hasInlinedValues={
              (key === 'technologies' || key === 'repositories') &&
              Array.isArray(value) &&
              value.length > 1
            }
            key={key}
            label={metaLabels[key]}
            value={getMetaValue(key, value)}
          />
        ) : undefined;
      })
      .filter(
        (item): item is ReactElement<MetaItemProps> =>
          typeof item !== 'undefined'
      );
  }, [getMetaValue, meta, metaLabels]);

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      {cover ? (
        <Figure aria-label={coverLabel} className={styles.cover} hasBorders>
          {cover}
        </Figure>
      ) : null}
      <MetaList className={styles.meta} isInline>
        {getMetaItems()}
      </MetaList>
    </div>
  );
};

export const ProjectOverview = forwardRef(ProjectOverviewWithRef);
