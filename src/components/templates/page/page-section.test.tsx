import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { PageSection } from './page-section';

describe('PageSection', () => {
  it('renders its children', () => {
    const body = 'a voluptas iste';

    render(<PageSection>{body}</PageSection>);

    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });

  it('can use the light variant', () => {
    const body = 'a voluptas iste';

    render(<PageSection variant="light">{body}</PageSection>);

    expect(rtlScreen.getByText(body).parentElement).toHaveClass(
      'section--light'
    );
  });

  it('can use the dark variant', () => {
    const body = 'a voluptas iste';

    render(<PageSection variant="dark">{body}</PageSection>);

    expect(rtlScreen.getByText(body).parentElement).toHaveClass(
      'section--dark'
    );
  });

  it('can have a border at the bottom', () => {
    const body = 'a voluptas iste';

    render(<PageSection hasBorder>{body}</PageSection>);

    expect(rtlScreen.getByText(body).parentElement).toHaveClass(
      'section--bordered'
    );
  });
});
