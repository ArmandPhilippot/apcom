import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Collapsible } from './collapsible';
import { Heading } from 'src/components/atoms';

const body =
  'Error autem numquam vero quo cum qui voluptatem est qui. Quasi id rem molestiae. Velit voluptatum dolores et officia. Ut voluptatem quae ut quaerat vel nulla.';
const heading = 'sed minima sed';

describe('Collapsible', () => {
  it('renders the collapsible heading and body', () => {
    const headingLevel = 2;

    render(
      <Collapsible heading={<Heading level={headingLevel}>{heading}</Heading>}>
        {body}
      </Collapsible>
    );

    expect(
      rtlScreen.getByRole('heading', { level: headingLevel })
    ).toHaveTextContent(heading);
    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });

  it('can be collapsed by default', () => {
    render(
      <Collapsible heading={<Heading level={3}>{heading}</Heading>} isCollapsed>
        {body}
      </Collapsible>
    );

    expect(rtlScreen.getByRole('button').parentElement).toHaveClass(
      'wrapper--collapsed'
    );
    // Neither toBeVisible or toHaveStyle are working.
    // expect(rtlScreen.getByText(body)).toHaveStyle({ visibility: 'hidden' });
    // expect(rtlScreen.getByText(body)).not.toBeVisible();
  });

  it('can be expanded by default', () => {
    render(
      <Collapsible
        heading={<Heading level={3}>{heading}</Heading>}
        isCollapsed={false}
      >
        {body}
      </Collapsible>
    );

    expect(rtlScreen.getByRole('button').parentElement).toHaveClass(
      'wrapper--expanded'
    );
    expect(rtlScreen.getByText(body)).toBeVisible();
  });

  it('can be collapsed and/or expanded by the user', async () => {
    const user = userEvent.setup();

    render(
      <Collapsible heading={<Heading level={3}>{heading}</Heading>}>
        {body}
      </Collapsible>
    );

    expect(rtlScreen.getByRole('button').parentElement).toHaveClass(
      'wrapper--expanded'
    );

    await user.click(rtlScreen.getByRole('button', { name: heading }));

    expect(rtlScreen.getByRole('button').parentElement).toHaveClass(
      'wrapper--collapsed'
    );

    await user.click(rtlScreen.getByRole('button', { name: heading }));

    expect(rtlScreen.getByRole('button').parentElement).toHaveClass(
      'wrapper--expanded'
    );
  });
});
