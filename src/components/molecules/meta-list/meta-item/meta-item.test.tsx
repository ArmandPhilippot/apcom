import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { MetaItem } from './meta-item';

describe('MetaItem', () => {
  it('renders a label and a value', () => {
    const label = 'iusto';
    const value = 'autem';

    render(
      <dl>
        <MetaItem label={label} value={value} />
      </dl>
    );

    expect(rtlScreen.getByRole('term')).toHaveTextContent(label);
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(value);
  });

  it('can render a label with multiple values', () => {
    const label = 'iusto';
    const values = [
      { id: 'autem', value: 'autem' },
      { id: 'quisquam', value: 'aut' },
      { id: 'molestias', value: 'voluptatem' },
    ];

    render(
      <dl>
        <MetaItem label={label} value={values} />
      </dl>
    );

    expect(rtlScreen.getByRole('term')).toHaveTextContent(label);
    expect(rtlScreen.getAllByRole('definition')).toHaveLength(values.length);
  });

  it('can render a centered group of label and values', () => {
    const label = 'iusto';
    const value = 'autem';

    render(
      <dl>
        <MetaItem isCentered label={label} value={value} />
      </dl>
    );

    expect(rtlScreen.getByRole('term').parentElement).toHaveClass(
      'item--centered'
    );
  });

  it('can render an inlined group of label and values', () => {
    const label = 'iusto';
    const value = 'autem';

    render(
      <dl>
        <MetaItem isInline label={label} value={value} />
      </dl>
    );

    expect(rtlScreen.getByRole('term').parentElement).toHaveClass(
      'item--inlined'
    );
  });

  it('can render a group of label and bordered values', () => {
    const label = 'iusto';
    const value = 'autem';

    render(
      <dl>
        <MetaItem hasBorderedValues label={label} value={value} />
      </dl>
    );

    expect(rtlScreen.getByRole('term').parentElement).toHaveClass(
      'item--bordered-values'
    );
  });

  it('can render a group of label and inlined values', () => {
    const label = 'iusto';
    const value = 'autem';

    render(
      <dl>
        <MetaItem hasInlinedValues label={label} value={value} />
      </dl>
    );

    expect(rtlScreen.getByRole('term').parentElement).toHaveClass(
      'item--inlined-values'
    );
  });
});
