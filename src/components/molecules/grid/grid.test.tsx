import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Grid } from './grid';
import { GridItem } from './grid-item';

const items = [
  { id: 'item-1', contents: 'Item 1' },
  { id: 'item-2', contents: 'Item 2' },
  { id: 'item-3', contents: 'Item 3' },
  { id: 'item-4', contents: 'Item 4' },
  { id: 'item-5', contents: 'Item 5' },
];

describe('Grid', () => {
  it('render a list of items as grid', () => {
    render(
      <Grid>
        {items.map((item) => (
          <GridItem key={item.id}>{item.contents}</GridItem>
        ))}
      </Grid>
    );

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('can render a list of items with fixed size', () => {
    const size = '200px';

    render(
      <Grid size={size}>
        {items.map((item) => (
          <GridItem key={item.id}>{item.contents}</GridItem>
        ))}
      </Grid>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('wrapper--has-fixed-size');
    expect(rtlScreen.getByRole('list')).toHaveStyle({ '--size': size });
  });

  it('can render a list of items with min size', () => {
    const size = '200px';

    render(
      <Grid sizeMin={size}>
        {items.map((item) => (
          <GridItem key={item.id}>{item.contents}</GridItem>
        ))}
      </Grid>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('wrapper--has-min-size');
    expect(rtlScreen.getByRole('list')).toHaveStyle({ '--size-min': size });
  });

  it('can render a list of items with max size', () => {
    const size = '200px';

    render(
      <Grid sizeMax={size}>
        {items.map((item) => (
          <GridItem key={item.id}>{item.contents}</GridItem>
        ))}
      </Grid>
    );

    expect(rtlScreen.getByRole('list')).toHaveStyle({ '--size-max': size });
  });

  it('can render a list of items with a custom gap', () => {
    const gap = 'md';

    render(
      <Grid gap={gap}>
        {items.map((item) => (
          <GridItem key={item.id}>{item.contents}</GridItem>
        ))}
      </Grid>
    );

    expect(rtlScreen.getByRole('list')).toHaveStyle({
      '--gap': `var(--spacing-${gap})`,
    });
  });

  it('can render a list of items with an explicit number of columns', () => {
    const col = 4;

    render(
      <Grid col={col}>
        {items.map((item) => (
          <GridItem key={item.id}>{item.contents}</GridItem>
        ))}
      </Grid>
    );

    expect(rtlScreen.getByRole('list')).toHaveStyle(`--col: ${col}`);
  });

  it('can render a centered list of items', () => {
    render(
      <Grid isCentered>
        {items.map((item) => (
          <GridItem key={item.id}>{item.contents}</GridItem>
        ))}
      </Grid>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('wrapper--is-centered');
  });
});
