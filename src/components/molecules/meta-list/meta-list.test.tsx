import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { MetaItem } from './meta-item';
import { MetaList } from './meta-list';

describe('MetaList', () => {
  it('renders a list of meta items', () => {
    const items = [
      { id: 'item1', label: 'Item 1', value: 'Value 1' },
      { id: 'item2', label: 'Item 2', value: 'Value 2' },
      { id: 'item3', label: 'Item 3', value: 'Value 3' },
      { id: 'item4', label: 'Item 4', value: 'Value 4' },
    ];

    render(
      <MetaList>
        {items.map(({ id, ...item }) => (
          <MetaItem key={id} {...item} />
        ))}
      </MetaList>
    );

    expect(rtlScreen.getAllByRole('term')).toHaveLength(items.length);
    expect(rtlScreen.getAllByRole('definition')).toHaveLength(items.length);
  });

  it('can render a centered list of meta items', () => {
    const items = [
      { id: 'item1', label: 'Item 1', value: 'Value 1' },
      { id: 'item2', label: 'Item 2', value: 'Value 2' },
      { id: 'item3', label: 'Item 3', value: 'Value 3' },
      { id: 'item4', label: 'Item 4', value: 'Value 4' },
    ];

    render(
      <MetaList isCentered>
        {items.map(({ id, ...item }) => (
          <MetaItem key={id} {...item} />
        ))}
      </MetaList>
    );

    const terms = rtlScreen.getAllByRole('term');

    expect(terms[0].parentElement?.parentElement).toHaveClass('list--centered');
  });

  it('can render an inlined list of meta items', () => {
    const items = [
      { id: 'item1', label: 'Item 1', value: 'Value 1' },
      { id: 'item2', label: 'Item 2', value: 'Value 2' },
      { id: 'item3', label: 'Item 3', value: 'Value 3' },
      { id: 'item4', label: 'Item 4', value: 'Value 4' },
    ];

    render(
      <MetaList isInline>
        {items.map(({ id, ...item }) => (
          <MetaItem key={id} {...item} />
        ))}
      </MetaList>
    );

    const terms = rtlScreen.getAllByRole('term');

    expect(terms[0].parentElement?.parentElement).toHaveClass('list--inlined');
  });
});
