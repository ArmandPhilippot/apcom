import { render, screen } from '@test-utils';
import Branding from './branding';

describe('Branding', () => {
  it('renders a photo', () => {
    render(
      <Branding
        photo="http://placeimg.com/640/480/city"
        title="Website title"
      />
    );
    expect(
      screen.getByRole('img', { name: 'Website title picture' })
    ).toBeInTheDocument();
  });

  it('renders a logo', () => {
    render(
      <Branding photo="http://placeimg.com/640/480/city" title="Website name" />
    );
    expect(screen.getByTitle('Website name logo')).toBeInTheDocument();
  });

  it('renders a baseline', () => {
    render(
      <Branding
        photo="http://placeimg.com/640/480"
        title="Website title"
        baseline="Website baseline"
      />
    );
    expect(screen.getByText('Website baseline')).toBeInTheDocument();
  });

  it('renders a title wrapped with h1 element', () => {
    render(
      <Branding
        photo="http://placeimg.com/640/480"
        title="Website title"
        isHome={true}
      />
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Website title' })
    ).toBeInTheDocument();
  });

  it('renders a title with h1 styles', () => {
    render(
      <Branding
        photo="http://placeimg.com/640/480"
        title="Website title"
        isHome={false}
      />
    );
    expect(
      screen.queryByRole('heading', { level: 1, name: 'Website title' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Website title')).toHaveClass('heading--1');
  });
});
