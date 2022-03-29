import Branding from '@components/Branding/Branding';
import { render, screen } from '@test-utils';
import '../__mocks__/matchMedia.mock';

describe('Branding', () => {
  it('renders the title wrapped with an h1 element on homepage', () => {
    render(<Branding isHome={true} />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Armand Philippot' })
    ).toBeInTheDocument();
  });

  it('renders the title wrapped without an h1 element on other pages', () => {
    render(<Branding isHome={false} />);
    expect(
      screen.queryByRole('heading', { level: 1, name: 'Armand Philippot' })
    ).not.toBeInTheDocument();
  });

  it('renders the baseline', () => {
    render(<Branding isHome={false} />);
    // Currently, only French translation is returned.
    expect(screen.getByText('Intégrateur web')).toBeInTheDocument();
  });
});
