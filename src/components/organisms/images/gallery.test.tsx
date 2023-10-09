import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import NextImage from 'next/image';
import { Gallery } from './gallery';

const columns = 3;

const image = {
  alt: 'Modi provident omnis',
  height: 480,
  src: 'http://picsum.photos/640/480',
  width: 640,
};

describe('Gallery', () => {
  it('renders the correct number of items', () => {
    render(
      <Gallery columns={columns}>
        <NextImage {...image} />
        <NextImage {...image} />
        <NextImage {...image} />
        <NextImage {...image} />
      </Gallery>
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('renders the right number of columns', () => {
    render(
      <Gallery columns={columns}>
        <NextImage {...image} />
        <NextImage {...image} />
        <NextImage {...image} />
        <NextImage {...image} />
      </Gallery>
    );
    expect(rtlScreen.getByRole('list')).toHaveClass(
      `wrapper--${columns}-columns`
    );
  });
});
