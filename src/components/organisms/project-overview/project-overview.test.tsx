import { describe, expect, it } from '@jest/globals';
import NextImage from 'next/image';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { type OverviewMeta, ProjectOverview } from './project-overview';
import { SocialLink } from 'src/components/atoms';

describe('ProjectOverview', () => {
  it('can render a meta for the creation date', () => {
    const meta = {
      creationDate: '2023-11-01',
    } satisfies Partial<OverviewMeta>;

    render(<ProjectOverview meta={meta} name="quo" />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Created on:');
  });

  it('can render a meta for the update date', () => {
    const meta = {
      lastUpdateDate: '2023-11-02',
    } satisfies Partial<OverviewMeta>;

    render(<ProjectOverview meta={meta} name="quo" />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Updated on:');
  });

  it('can render a meta for the license', () => {
    const meta = {
      license: 'MIT',
    } satisfies Partial<OverviewMeta>;

    render(<ProjectOverview meta={meta} name="quo" />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('License:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(meta.license);
  });

  it('can render a meta for the popularity', () => {
    const meta = {
      popularity: '5 stars',
    } satisfies Partial<OverviewMeta>;

    render(<ProjectOverview meta={meta} name="quo" />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Popularity:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(
      meta.popularity
    );
  });

  it('can render a meta for the technologies', () => {
    const meta = {
      technologies: ['Javascript', 'React'].map((techno) => {
        return {
          id: techno,
          value: techno,
        };
      }),
    } satisfies Partial<OverviewMeta>;

    render(<ProjectOverview meta={meta} name="quo" />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Technologies:');
    expect(rtlScreen.getAllByRole('definition')).toHaveLength(
      meta.technologies.length
    );
  });

  it('can render a meta for the repositories', () => {
    const repos = [{ id: 'Github' as const, label: 'Github', url: '#github' }];
    const meta = {
      repositories: repos.map((repo) => {
        return {
          id: repo.id,
          value: (
            <SocialLink
              icon={repo.id}
              key={repo.id}
              label={repo.label}
              url={repo.url}
            />
          ),
        };
      }),
    } satisfies Partial<OverviewMeta>;

    render(<ProjectOverview meta={meta} name="quo" />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Repositories:');
    expect(rtlScreen.getAllByRole('definition')).toHaveLength(
      meta.repositories.length
    );
    expect(
      rtlScreen.getByRole('link', { name: repos[0].label })
    ).toHaveAttribute('href', repos[0].url);
  });

  it('can render a cover', () => {
    const altTxt = 'id qui nisi';

    render(
      <ProjectOverview
        cover={
          <NextImage
            alt={altTxt}
            height={480}
            src="https://picsum.photos/640/480"
            width={640}
          />
        }
        meta={{}}
        name="qui"
      />
    );

    expect(rtlScreen.getByRole('img')).toHaveAccessibleName(altTxt);
  });

  it('does not render a meta if the key is undefined', () => {
    const meta = {
      creationDate: undefined,
    } satisfies Partial<OverviewMeta>;

    render(<ProjectOverview meta={meta} name="quo" />);

    expect(rtlScreen.queryByRole('term')).not.toBeInTheDocument();
  });
});
