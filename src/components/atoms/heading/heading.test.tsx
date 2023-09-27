import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Heading } from './heading';

describe('Heading', () => {
  it('renders a h1', () => {
    const body = 'provident';

    render(<Heading level={1}>{body}</Heading>);

    expect(rtlScreen.getByRole('heading', { level: 1 })).toHaveTextContent(
      body
    );
  });

  it('renders a h2', () => {
    const body = 'iure';

    render(<Heading level={2}>{body}</Heading>);

    expect(rtlScreen.getByRole('heading', { level: 2 })).toHaveTextContent(
      body
    );
  });

  it('renders a h3', () => {
    const body = 'ut';

    render(<Heading level={3}>{body}</Heading>);

    expect(rtlScreen.getByRole('heading', { level: 3 })).toHaveTextContent(
      body
    );
  });

  it('renders a h4', () => {
    const body = 'dolor';

    render(<Heading level={4}>{body}</Heading>);

    expect(rtlScreen.getByRole('heading', { level: 4 })).toHaveTextContent(
      body
    );
  });

  it('renders a h5', () => {
    const body = 'temporibus';

    render(<Heading level={5}>{body}</Heading>);

    expect(rtlScreen.getByRole('heading', { level: 5 })).toHaveTextContent(
      body
    );
  });

  it('renders a h6', () => {
    const body = 'at';

    render(<Heading level={6}>{body}</Heading>);

    expect(rtlScreen.getByRole('heading', { level: 6 })).toHaveTextContent(
      body
    );
  });

  it('renders a fake heading', () => {
    const body = 'dignissimos';

    render(
      <Heading isFake level={2}>
        {body}
      </Heading>
    );

    expect(
      rtlScreen.queryByRole('heading', { level: 2 })
    ).not.toBeInTheDocument();
    expect(rtlScreen.getByText(body)).toHaveClass('heading--2');
  });
});
