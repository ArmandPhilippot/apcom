import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Description } from './description';
import { DescriptionList } from './description-list';
import { Group } from './group';
import { Term } from './term';

describe('DescriptionList', () => {
  it('renders a list of terms and description', () => {
    const term = 'A term';
    const desc = 'A description of the term.';

    render(
      <DescriptionList>
        <Term>{term}</Term>
        <Description>{desc}</Description>
      </DescriptionList>
    );

    expect(rtlScreen.getByRole('definition')).toHaveTextContent(desc);
    expect(rtlScreen.getByRole('term')).toHaveTextContent(term);
  });

  it('can renders a list of terms and description wrapped in a div', () => {
    const term = 'A term';
    const desc = 'A description of the term.';

    render(
      <DescriptionList>
        <Group>
          <Term>{term}</Term>
          <Description>{desc}</Description>
        </Group>
      </DescriptionList>
    );

    expect(rtlScreen.getByRole('definition')).toHaveTextContent(desc);
    expect(rtlScreen.getByRole('term')).toHaveTextContent(term);
  });

  it('can render terms and description inlined', () => {
    const term = 'A term';
    const desc = 'A description of the term.';

    render(
      <DescriptionList isInline>
        <Term>{term}</Term>
        <Description>{desc}</Description>
      </DescriptionList>
    );

    const list = rtlScreen.getByRole('term').parentElement;
    expect(list).toHaveClass('list--inline');
  });

  it('can render terms and description stacked', () => {
    const term = 'A term';
    const desc = 'A description of the term.';

    render(
      <DescriptionList>
        <Term>{term}</Term>
        <Description>{desc}</Description>
      </DescriptionList>
    );

    const list = rtlScreen.getByRole('term').parentElement;
    expect(list).toHaveClass('list--stack');
  });
});
