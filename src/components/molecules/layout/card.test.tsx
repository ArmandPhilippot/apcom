import { render, screen } from '../../../../tests/utils';
import Card from './card';
import { cover, id, meta, tagline, title, url } from './card.fixture';

describe('Card', () => {
  it('renders a title wrapped in h2 element', () => {
    render(<Card id={id} title={title} titleLevel={2} url={url} />);
    expect(
      screen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });

  it('renders a link to another page', () => {
    render(<Card id={id} title={title} titleLevel={2} url={url} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', url);
  });

  it('renders a cover', () => {
    render(
      <Card id={id} title={title} titleLevel={2} url={url} cover={cover} />
    );
    expect(screen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });

  it('renders a tagline', () => {
    render(
      <Card id={id} title={title} titleLevel={2} url={url} tagline={tagline} />
    );
    expect(screen.getByText(tagline)).toBeInTheDocument();
  });

  it('renders some meta', () => {
    render(<Card id={id} title={title} titleLevel={2} url={url} meta={meta} />);
    expect(screen.getByText(meta.author)).toBeInTheDocument();
  });
});
