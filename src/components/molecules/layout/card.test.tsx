import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import type { MetaItemData } from '../meta-list';
import { Card } from './card';

const cover = {
  alt: 'A picture',
  height: 480,
  src: 'https://picsum.photos/640/480',
  width: 640,
};

const id = 'nam';

const meta = [
  { id: 'author', label: 'Author', value: 'Possimus' },
  {
    id: 'categories',
    label: 'Categories',
    value: [
      { id: 'autem', value: 'Autem' },
      { id: 'eos', value: 'Eos' },
    ],
  },
] satisfies MetaItemData[];

const tagline = 'Ut rerum incidunt';

const title = 'Alias qui porro';

const url = '/an-existing-url';

describe('Card', () => {
  it('renders a title wrapped in h2 element', () => {
    render(<Card id={id} title={title} titleLevel={2} url={url} />);
    expect(
      rtlScreen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });

  it('renders a link to another page', () => {
    render(<Card id={id} title={title} titleLevel={2} url={url} />);
    expect(rtlScreen.getByRole('link')).toHaveAttribute('href', url);
  });

  it('renders a cover', () => {
    render(
      <Card id={id} title={title} titleLevel={2} url={url} cover={cover} />
    );
    expect(rtlScreen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });

  it('renders a tagline', () => {
    render(
      <Card id={id} title={title} titleLevel={2} url={url} tagline={tagline} />
    );
    expect(rtlScreen.getByText(tagline)).toBeInTheDocument();
  });

  it('renders some meta', () => {
    render(<Card id={id} title={title} titleLevel={2} url={url} meta={meta} />);

    const metaLabels = meta.map((item) => item.label);

    for (const label of metaLabels) {
      expect(rtlScreen.getByText(label)).toBeInTheDocument();
    }
  });
});
