import { render, screen } from '@test-utils';
import Card from './card';

const cover = {
  alt: 'A picture',
  height: 480,
  src: 'http://placeimg.com/640/480',
  width: 640,
};

const meta = [
  {
    id: 'an-id',
    term: 'Voluptates',
    value: ['Autem', 'Eos'],
  },
];

const tagline = 'Ut rerum incidunt';

const title = 'Alias qui porro';

const url = '/an-existing-url';

describe('Card', () => {
  it('renders a title wrapped in h2 element', () => {
    render(<Card title={title} titleLevel={2} url={url} />);
    expect(
      screen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });

  it('renders a link to another page', () => {
    render(<Card title={title} titleLevel={2} url={url} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', url);
  });

  it('renders a cover', () => {
    render(<Card title={title} titleLevel={2} url={url} cover={cover} />);
    expect(screen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });

  it('renders a tagline', () => {
    render(<Card title={title} titleLevel={2} url={url} tagline={tagline} />);
    expect(screen.getByText(tagline)).toBeInTheDocument();
  });

  it('renders some meta', () => {
    render(<Card title={title} titleLevel={2} url={url} meta={meta} />);
    expect(screen.getByText(meta[0].term)).toBeInTheDocument();
  });
});
