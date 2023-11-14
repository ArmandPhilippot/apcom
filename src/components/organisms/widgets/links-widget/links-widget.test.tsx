import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Heading } from '../../../atoms';
import { LinksWidget, type LinksWidgetItemData } from './links-widget';

describe('LinksWidget', () => {
  it('renders the widget heading and a list of links', () => {
    const heading = 'modi sit fugiat';
    const headingLvl = 3;
    const items = [
      { id: 'item1', label: 'Link 1', url: '#link1' },
      { id: 'item2', label: 'Link 2', url: '#link2' },
      { id: 'item3', label: 'Link 3', url: '#link3' },
    ] satisfies LinksWidgetItemData[];

    render(
      <LinksWidget
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        items={items}
      />
    );

    expect(
      rtlScreen.getByRole('heading', { level: headingLvl })
    ).toHaveTextContent(heading);
    expect(rtlScreen.getAllByRole('link').length).toBe(items.length);
  });

  it('can render a nested list of links', () => {
    const heading = 'modi sit fugiat';
    const headingLvl = 3;
    const items = [
      { id: 'item1', label: 'Link 1', url: '#link1' },
      {
        id: 'item2',
        label: 'Link 2',
        url: '#link2',
        child: [
          { id: 'subitem1', label: 'Nested link 1', url: '#nested-link1' },
          { id: 'subitem2', label: 'Nested link 2', url: '#nested-link2' },
        ],
      },
      { id: 'item3', label: 'Link 3', url: '#link3' },
    ] satisfies LinksWidgetItemData[];

    render(
      <LinksWidget
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        items={items}
      />
    );

    const totalLinks =
      items.length +
      items.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue.child?.length ?? 0),
        0
      );

    expect(rtlScreen.getAllByRole('link').length).toBe(totalLinks);
  });

  it('can render an ordered list of links', () => {
    const heading = 'modi sit fugiat';
    const headingLvl = 3;
    const items = [
      { id: 'item1', label: 'Link 1', url: '#link1' },
      { id: 'item2', label: 'Link 2', url: '#link2' },
      { id: 'item3', label: 'Link 3', url: '#link3' },
    ] satisfies LinksWidgetItemData[];

    render(
      <LinksWidget
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        isOrdered
        items={items}
      />
    );

    expect(rtlScreen.getByRole('list')).toHaveClass(`list--ordered`);
  });
});
