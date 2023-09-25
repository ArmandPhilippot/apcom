import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { FlippingLogo } from './flipping-logo';

describe('FlippingLogo', () => {
  it('renders a photo', () => {
    render(
      <FlippingLogo
        altText="Alternative text"
        photo="http://placeimg.com/640/480"
      />
    );
    expect(screen.getByAltText('Alternative text')).toBeInTheDocument();
  });

  it('renders a logo', () => {
    render(
      <FlippingLogo
        altText="Alternative text"
        logoTitle="A logo title"
        photo="http://placeimg.com/640/480"
      />
    );
    expect(screen.getByTitle('A logo title')).toBeInTheDocument();
  });
});
