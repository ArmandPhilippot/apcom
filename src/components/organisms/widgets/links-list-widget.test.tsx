import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Heading } from '../../atoms';
import { LinksListWidget } from './links-list-widget';

const title = 'Voluptatem minus autem';

const items = [
  { name: 'Item 1', url: '/item-1' },
  { name: 'Item 2', url: '/item-2' },
  { name: 'Item 3', url: '/item-3' },
];

describe('LinksListWidget', () => {
  it('renders a widget title', () => {
    render(
      <LinksListWidget
        heading={<Heading level={3}>{title}</Heading>}
        items={items}
      />
    );
    expect(
      rtlScreen.getByRole('heading', { level: 3, name: new RegExp(title, 'i') })
    ).toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    render(
      <LinksListWidget
        heading={
          <Heading isFake level={3}>
            {title}
          </Heading>
        }
        items={items}
      />
    );
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('renders some links', () => {
    render(
      <LinksListWidget
        heading={
          <Heading isFake level={3}>
            {title}
          </Heading>
        }
        items={items}
      />
    );
    expect(
      rtlScreen.getByRole('link', { name: items[0].name })
    ).toHaveAttribute('href', items[0].url);
  });
});
