import { render, screen } from '../../../../tests/utils';
import Footer, { type FooterProps } from './footer';

const copyright: FooterProps['copyright'] = {
  dates: { start: '2017', end: '2022' },
  owner: 'Lorem ipsum',
  icon: 'CC',
};

const navItems: FooterProps['navItems'] = [
  { id: 'legal-notice', href: '#', label: 'Legal notice' },
];

describe('Footer', () => {
  it('renders the website copyright', () => {
    render(<Footer copyright={copyright} topId="top" />);
    expect(screen.getByText(copyright.owner)).toBeInTheDocument();
  });

  it('renders a back to top link', () => {
    render(<Footer copyright={copyright} topId="top" />);
    expect(
      screen.getByRole('link', { name: 'Back to top' })
    ).toBeInTheDocument();
  });

  it('renders some nav items', () => {
    render(<Footer copyright={copyright} navItems={navItems} topId="top" />);
    expect(
      screen.getByRole('link', { name: navItems[0].label })
    ).toBeInTheDocument();
  });
});
