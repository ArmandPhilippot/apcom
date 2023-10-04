/* eslint-disable max-statements */
import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Icon } from './icon';

/* eslint-disable jsx-a11y/prefer-tag-over-role -- Valid on SVG */
describe('Icon', () => {
  it('can render an icon with a heading', () => {
    const heading = 'architecto';

    render(<Icon heading={heading} shape="arrow" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('can render an icon with a description', () => {
    const description = 'fuga voluptates eligendi';

    render(<Icon description={description} shape="arrow" role="img" />);

    expect(rtlScreen.getByRole('img')).toHaveTextContent(description);
  });

  it('render an icon with bottom arrow shape', () => {
    const heading = 'quae';

    render(
      <Icon heading={heading} orientation="bottom" shape="arrow" role="img" />
    );

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with left arrow shape', () => {
    const heading = 'nemo';

    render(
      <Icon heading={heading} orientation="left" shape="arrow" role="img" />
    );

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with right arrow shape', () => {
    const heading = 'odit';

    render(
      <Icon heading={heading} orientation="right" shape="arrow" role="img" />
    );

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with top arrow shape', () => {
    const heading = 'ut';

    render(
      <Icon heading={heading} orientation="top" shape="arrow" role="img" />
    );

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with career shape', () => {
    const heading = 'autem';

    render(<Icon heading={heading} shape="career" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with cc-by-sa shape', () => {
    const heading = 'blanditiis';

    render(<Icon heading={heading} shape="cc-by-sa" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with cog shape', () => {
    const heading = 'consequatur';

    render(<Icon heading={heading} shape="cog" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with computer shape', () => {
    const heading = 'amet';

    render(<Icon heading={heading} shape="computer" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with cross shape', () => {
    const heading = 'molestias';

    render(<Icon heading={heading} shape="cross" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with envelop shape', () => {
    const heading = 'laudantium';

    render(<Icon heading={heading} shape="envelop" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });
  it('render an icon with feed shape', () => {
    const heading = 'beatae';

    render(<Icon heading={heading} shape="feed" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with help shape', () => {
    const heading = 'quidem';

    render(<Icon heading={heading} shape="help" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with home shape', () => {
    const heading = 'aut';

    render(<Icon heading={heading} shape="home" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with magnifying glass shape', () => {
    const heading = 'rerum';

    render(<Icon heading={heading} shape="magnifying-glass" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with moon shape', () => {
    const heading = 'saepe';

    render(<Icon heading={heading} shape="moon" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with posts stack shape', () => {
    const heading = 'sunt';

    render(<Icon heading={heading} shape="posts-stack" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with sun shape', () => {
    const heading = 'aut';

    render(<Icon heading={heading} shape="sun" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with hamburger shape', () => {
    const heading = 'sed';

    render(<Icon aria-label={heading} shape="hamburger" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with minus shape', () => {
    const heading = 'sunt';

    render(<Icon aria-label={heading} shape="minus" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });

  it('render an icon with plus shape', () => {
    const heading = 'maxime';

    render(<Icon aria-label={heading} shape="plus" role="img" />);

    expect(rtlScreen.getByRole('img', { name: heading })).toBeInTheDocument();
  });
});
