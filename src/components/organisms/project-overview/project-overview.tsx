import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
  useCallback,
  type ReactElement,
} from 'react';
import { useIntl } from 'react-intl';
import { Figure } from '../../atoms';
import {
  MetaItem,
  type MetaItemProps,
  MetaList,
  type MetaValue,
  type MetaValues,
} from '../../molecules';
import styles from './project-overview.module.scss';

export type OverviewMeta = {
  creationDate: MetaValue;
  lastUpdateDate: MetaValue;
  license: MetaValue;
  popularity: MetaValue;
  repositories: MetaValue | MetaValues[];
  technologies: MetaValues[];
};

const validMeta = [
  'creationDate',
  'lastUpdateDate',
  'license',
  'popularity',
  'repositories',
  'technologies',
] satisfies (keyof OverviewMeta)[];

const isValidMetaKey = (key: string): key is keyof OverviewMeta =>
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
  meta: Partial<OverviewMeta>;
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
  } satisfies Record<keyof OverviewMeta, string>;

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
            value={value}
          />
        ) : undefined;
      })
      .filter(
        (item): item is ReactElement<MetaItemProps> =>
          typeof item !== 'undefined'
      );
  }, [meta, metaLabels]);

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
