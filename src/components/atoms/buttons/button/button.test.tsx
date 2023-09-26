/* eslint-disable max-statements */
import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders the button body', () => {
    const body = 'aliquid';

    render(<Button>{body}</Button>);
    expect(rtlScreen.getByRole('button')).toHaveTextContent(body);
  });

  it('renders a disabled button', () => {
    const body = 'quod';

    render(<Button isDisabled>{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toBeDisabled();
  });

  it('renders a button currently loading something', () => {
    const body = 'quod';

    render(<Button isLoading>{body}</Button>);

    expect(rtlScreen.getByRole('button', { busy: true })).toHaveAccessibleName(
      body
    );
  });

  it('renders a pressed button', () => {
    const body = 'quod';

    render(<Button isPressed>{body}</Button>);

    expect(
      rtlScreen.getByRole('button', { pressed: true })
    ).toHaveAccessibleName(body);
  });

  it('renders a submit button', () => {
    const body = 'dolorum';

    render(<Button type="submit">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveAttribute(
      'type',
      'submit'
    );
  });

  it('renders a reset button', () => {
    const body = 'consectetur';

    render(<Button type="reset">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveAttribute(
      'type',
      'reset'
    );
  });

  it('renders a primary button', () => {
    const body = 'iure';

    render(<Button kind="primary">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveClass(
      'btn--primary'
    );
  });

  it('renders a secondary button', () => {
    const body = 'et';

    render(<Button kind="secondary">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveClass(
      'btn--secondary'
    );
  });

  it('renders a tertiary button', () => {
    const body = 'quo';

    render(<Button kind="tertiary">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveClass(
      'btn--tertiary'
    );
  });

  it('renders a neutral button', () => {
    const body = 'voluptatem';

    render(<Button kind="neutral">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveClass(
      'btn--neutral'
    );
  });

  it('renders a circle button', () => {
    const body = 'laudantium';

    render(<Button shape="circle">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveClass(
      'btn--circle'
    );
  });

  it('renders a rectangle button', () => {
    const body = 'ut';

    render(<Button shape="rectangle">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveClass(
      'btn--rectangle'
    );
  });

  it('renders a square button', () => {
    const body = 'non';

    render(<Button shape="square">{body}</Button>);

    expect(rtlScreen.getByRole('button', { name: body })).toHaveClass(
      'btn--square'
    );
  });
});
