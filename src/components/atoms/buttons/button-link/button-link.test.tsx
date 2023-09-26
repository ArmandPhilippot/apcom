import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { ButtonLink } from './button-link';

describe('ButtonLink', () => {
  it('renders a link with anchor and href', () => {
    const target = 'eum';
    const body = 'est eaque nostrum';

    render(<ButtonLink to={target}>{body}</ButtonLink>);

    expect(rtlScreen.getByRole('link', { name: body })).toHaveAttribute(
      'href',
      target
    );
  });

  it('renders an external link', () => {
    const target = 'voluptatem';
    const body = 'impedit';

    render(
      <ButtonLink isExternal to={target}>
        {body}
      </ButtonLink>
    );

    expect(rtlScreen.getByRole('link', { name: body })).toHaveAttribute(
      'rel',
      expect.stringContaining('external')
    );
  });

  it('renders a primary button', () => {
    const target = 'vero';
    const body = 'iure';

    render(
      // eslint-disable-next-line react/jsx-no-literals -- Ignore kind.
      <ButtonLink kind="primary" to={target}>
        {body}
      </ButtonLink>
    );

    expect(rtlScreen.getByRole('link', { name: body })).toHaveClass(
      'btn--primary'
    );
  });

  it('renders a secondary button', () => {
    const target = 'voluptatem';
    const body = 'et';

    render(
      // eslint-disable-next-line react/jsx-no-literals -- Ignore kind.
      <ButtonLink kind="secondary" to={target}>
        {body}
      </ButtonLink>
    );

    expect(rtlScreen.getByRole('link', { name: body })).toHaveClass(
      'btn--secondary'
    );
  });

  it('renders a tertiary button', () => {
    const target = 'vitae';
    const body = 'quo';

    render(
      // eslint-disable-next-line react/jsx-no-literals -- Ignore kind.
      <ButtonLink kind="tertiary" to={target}>
        {body}
      </ButtonLink>
    );

    expect(rtlScreen.getByRole('link', { name: body })).toHaveClass(
      'btn--tertiary'
    );
  });

  it('renders a circle button', () => {
    const target = 'praesentium';
    const body = 'laudantium';

    render(
      // eslint-disable-next-line react/jsx-no-literals -- Ignore kind.
      <ButtonLink shape="circle" to={target}>
        {body}
      </ButtonLink>
    );

    expect(rtlScreen.getByRole('link', { name: body })).toHaveClass(
      'btn--circle'
    );
  });

  it('renders a rectangle button', () => {
    const target = 'tempora';
    const body = 'ut';

    render(
      // eslint-disable-next-line react/jsx-no-literals -- Ignore kind.
      <ButtonLink shape="rectangle" to={target}>
        {body}
      </ButtonLink>
    );

    expect(rtlScreen.getByRole('link', { name: body })).toHaveClass(
      'btn--rectangle'
    );
  });

  it('renders a square button', () => {
    const target = 'quia';
    const body = 'non';

    render(
      // eslint-disable-next-line react/jsx-no-literals -- Ignore kind.
      <ButtonLink shape="square" to={target}>
        {body}
      </ButtonLink>
    );

    expect(rtlScreen.getByRole('link', { name: body })).toHaveClass(
      'btn--square'
    );
  });
});
