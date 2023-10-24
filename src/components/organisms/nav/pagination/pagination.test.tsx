import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import {
  Pagination,
  type RenderPaginationItemAriaLabel,
  type RenderPaginationLink,
} from './pagination';

const pagePrefix = '#page-';
const backwardLabel = 'omnis assumenda ex';
const forwardLabel = 'voluptatum aut molestiae';
const currentPageLabelPrefix = 'est nostrum a';
const pageLabelPrefix = 'reprehenderit qui unde';

const renderLink: RenderPaginationLink = (num: number) => `${pagePrefix}${num}`;

const renderItemAriaLabel: RenderPaginationItemAriaLabel = ({
  kind,
  pageNumber,
  isCurrentPage,
}) => {
  switch (kind) {
    case 'backward':
      return backwardLabel;
    case 'forward':
      return forwardLabel;
    case 'number':
    default:
      return isCurrentPage
        ? `${currentPageLabelPrefix}${pageNumber}`
        : `${pageLabelPrefix}${pageNumber}`;
  }
};

describe('Pagination', () => {
  it('renders a list of items in a nav element', () => {
    const ariaLabel = 'expedita repellat rem';
    const current = 1;
    const total = 1;

    render(
      <Pagination
        aria-label={ariaLabel}
        current={current}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        total={total}
      />
    );

    expect(
      rtlScreen.getByRole('navigation', { name: ariaLabel })
    ).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(total);
  });

  it('can render a forward link when there is more than one page', () => {
    const ariaLabel = 'expedita repellat rem';
    const current = 1;
    const total = 3;

    render(
      <Pagination
        aria-label={ariaLabel}
        current={current}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        total={total}
      />
    );

    expect(
      rtlScreen.getByRole('link', { name: forwardLabel })
    ).toBeInTheDocument();
    // the pages links + the forward link
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(total + 1);
  });

  it('can render a backward link when the last page is selected', () => {
    const ariaLabel = 'expedita repellat rem';
    const total = 3;

    render(
      <Pagination
        aria-label={ariaLabel}
        current={total}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        total={total}
      />
    );

    expect(
      rtlScreen.getByRole('link', { name: backwardLabel })
    ).toBeInTheDocument();
    // the pages links + the backward link
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(total + 1);
  });

  it('can skip next pages when the total is high and first page is selected', () => {
    const ariaLabel = 'expedita repellat rem';
    const current = 1;
    const total = 50;
    /*
     * First page & the two next pages + 1 ellipsis + last page + forward link
     */
    const expectedItemsCount = 6;

    render(
      <Pagination
        aria-label={ariaLabel}
        current={current}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        total={total}
      />
    );

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
    // The current page and the ellipsis should not be linked.
    expect(rtlScreen.getAllByRole('link')).toHaveLength(expectedItemsCount - 2);
  });

  it('can skip previous pages when the total is high and last page is selected', () => {
    const ariaLabel = 'expedita repellat rem';
    const current = 50;
    const total = 50;
    /*
     * Last page & the two previous pages + 1 ellipsis + first page + backward
     * link
     */
    const expectedItemsCount = 6;

    render(
      <Pagination
        aria-label={ariaLabel}
        current={current}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        total={total}
      />
    );

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
    // The current page and the ellipsis should not be linked.
    expect(rtlScreen.getAllByRole('link')).toHaveLength(expectedItemsCount - 2);
  });

  it('can render a custom number of siblings', () => {
    const ariaLabel = 'expedita repellat rem';
    const siblings = 3;
    const current = 10;
    const total = 20;
    /*
     * Current page + 3 siblings on each side + first page + last page + 2
     * ellipsis + backward and forward links
     */
    const expectedItemsCount = 13;

    render(
      <Pagination
        aria-label={ariaLabel}
        current={current}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        siblings={siblings}
        total={total}
      />
    );

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers -- The
    current page and the two ellipsis should not be linked. */
    expect(rtlScreen.getAllByRole('link')).toHaveLength(expectedItemsCount - 3);
  });
});
