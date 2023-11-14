import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Heading } from '../../../atoms';
import { TocWidget } from './toc-widget';

describe('TocWidget', () => {
  it('renders the widget heading and a list of links', () => {
    const heading = 'fugit iusto qui';
    const headingLvl = 3;
    const tree = [
      { children: [], depth: 2, id: 'title1', label: 'Title 1' },
      {
        children: [
          { children: [], depth: 3, id: 'subtitle1', label: 'Subtitle 1' },
          { children: [], depth: 3, id: 'subtitle2', label: 'Subtitle 2' },
        ],
        depth: 2,
        id: 'title2',
        label: 'Title 2',
      },
      { children: [], depth: 2, id: 'title3', label: 'Title 3' },
    ];

    render(
      <TocWidget
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        tree={tree}
      />
    );

    const totalLinks =
      tree.length +
      tree.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.children.length,
        0
      );

    expect(
      rtlScreen.getByRole('heading', { level: headingLvl })
    ).toHaveTextContent(heading);
    expect(rtlScreen.getAllByRole('link')).toHaveLength(totalLinks);
  });
});
