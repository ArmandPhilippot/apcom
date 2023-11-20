import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import type { BreadcrumbsItem } from '../../organisms';
import { Page } from './page';
import { PageBody } from './page-body';

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
      { id: 'home', name: 'Home', url: '#home' },
      { id: 'blog', name: 'Blog', url: '#blog' },
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
});
