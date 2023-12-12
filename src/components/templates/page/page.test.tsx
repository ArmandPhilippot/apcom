import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import type { BreadcrumbsItem } from '../../organisms';
import { Page } from './page';
import { PageBody } from './page-body';
import { PageSection } from './page-section';
import { Heading } from 'src/components/atoms';

describe('Page', () => {
  it('renders its children', () => {
    const body =
      'Consequatur deleniti eligendi quidem sint et nobis ut qui. Dolores modi eos. Cupiditate aliquid sunt consequatur voluptatem laudantium.';

    render(
      <Page>
        <PageBody>{body}</PageBody>
      </Page>
    );

    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });

  it('can render the breadcrumbs', () => {
    const body =
      'Consequatur deleniti eligendi quidem sint et nobis ut qui. Dolores modi eos. Cupiditate aliquid sunt consequatur voluptatem laudantium.';
    const breadcrumbs = [
      { id: 'home', label: 'Home', slug: '#home' },
      { id: 'blog', label: 'Blog', slug: '#blog' },
    ] satisfies BreadcrumbsItem[];

    render(
      <Page breadcrumbs={breadcrumbs}>
        <PageBody>{body}</PageBody>
      </Page>
    );

    expect(rtlScreen.getByRole('navigation')).toHaveAccessibleName(
      'Breadcrumbs'
    );
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(breadcrumbs.length);
  });

  it('can have a class modifier based on a prop', () => {
    const body =
      'Consequatur deleniti eligendi quidem sint et nobis ut qui. Dolores modi eos. Cupiditate aliquid sunt consequatur voluptatem laudantium.';

    render(<Page isBodyLastChild>{body}</Page>);

    expect(rtlScreen.getByText(body)).toHaveClass('page--body-last');
  });

  it('can render a sectioned page', () => {
    const sections = [
      {
        heading: 'excepturi ex dolorum',
        contents:
          'Id eius voluptas rerum nemo ullam omnis provident deserunt. Expedita sit ut consequatur deleniti. Maiores nam. Necessitatibus pariatur et qui dolor quia labore.',
      },
      {
        heading: 'rerum corporis et',
        contents:
          'Vel maxime doloremque quo laborum debitis. Ab perferendis animi dolores et ut voluptatem. Tempore aut doloremque sunt enim aut sint. Quae iure saepe consectetur. Ex animi ut. Nobis aliquid iste accusantium nesciunt ab voluptas illum.',
      },
    ];

    render(
      <Page hasSections>
        {sections.map((section) => (
          <PageSection aria-label={section.heading} key={section.heading}>
            <Heading level={2}>{section.heading}</Heading>
            <p>{section.contents}</p>
          </PageSection>
        ))}
      </Page>
    );

    expect(rtlScreen.getAllByRole('region')).toHaveLength(sections.length);
    expect(rtlScreen.getByRole('article')).toHaveClass('page--full');
  });
});
