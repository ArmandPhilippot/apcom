import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { ResponsiveImage } from '../../molecules';
import { Gallery } from './gallery';

const columns = 3;

const image = {
  alt: 'Modi provident omnis',
  height: 480,
  src: 'http://placeimg.com/640/480/fashion',
  width: 640,
};

describe('Gallery', () => {
  it('renders the correct number of items', () => {
    render(
      <Gallery columns={columns}>
        <ResponsiveImage {...image} />
        <ResponsiveImage {...image} />
        <ResponsiveImage {...image} />
        <ResponsiveImage {...image} />
      </Gallery>
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('renders the right number of columns', () => {
    render(
      <Gallery columns={columns}>
        <ResponsiveImage {...image} />
        <ResponsiveImage {...image} />
        <ResponsiveImage {...image} />
        <ResponsiveImage {...image} />
      </Gallery>
    );
    expect(screen.getByRole('list')).toHaveClass(`wrapper--${columns}-columns`);
  });
});
