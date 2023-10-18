import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Grid, type GridItem } from './grid';

const items: GridItem[] = [
  { id: 'item-1', item: 'Item 1' },
  { id: 'item-2', item: 'Item 2' },
  { id: 'item-3', item: 'Item 3' },
  { id: 'item-4', item: 'Item 4' },
  { id: 'item-5', item: 'Item 5' },
];

describe('Grid', () => {
  it('render a list of items as grid', () => {
    render(<Grid items={items} />);

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('can render a list of items with fixed size', () => {
    const size = '200px';

    render(<Grid items={items} size={size} />);

    expect(rtlScreen.getByRole('list')).toHaveClass('wrapper--has-fixed-size');
    expect(rtlScreen.getByRole('list')).toHaveStyle({ '--size': size });
  });

  it('can render a list of items with min size', () => {
    const size = '200px';

    render(<Grid items={items} sizeMin={size} />);

    expect(rtlScreen.getByRole('list')).toHaveClass('wrapper--has-min-size');
    expect(rtlScreen.getByRole('list')).toHaveStyle({ '--size-min': size });
  });

  it('can render a list of items with max size', () => {
    const size = '200px';

    render(<Grid items={items} sizeMax={size} />);

    expect(rtlScreen.getByRole('list')).toHaveStyle({ '--size-max': size });
  });

  it('can render a list of items with a custom gap', () => {
    const gap = 'md';

    render(<Grid items={items} gap={gap} />);

    expect(rtlScreen.getByRole('list')).toHaveStyle({
      '--gap': `var(--spacing-${gap})`,
    });
  });

  it('can render a list of items with an explicit number of columns', () => {
    const col = 4;

    render(<Grid col={col} items={items} />);

    expect(rtlScreen.getByRole('list')).toHaveStyle(`--col: ${col}`);
  });

  it('can render a centered list of items', () => {
    render(<Grid isCentered items={items} />);

    expect(rtlScreen.getByRole('list')).toHaveClass('wrapper--is-centered');
  });
});
