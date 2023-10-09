import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import NextImage from 'next/image';
import { FlippingLogo } from './flipping-logo';

describe('FlippingLogo', () => {
  it('renders both sides of the logo', () => {
    const frontAltTxt = 'aliquam officia et';
    const backAltTxt = 'voluptas nesciunt itaque';

    render(
      <FlippingLogo
        back={
          <NextImage
            alt={backAltTxt}
            height={100}
            src="https://picsum.photos/100"
            width={100}
          />
        }
        front={
          <NextImage
            alt={frontAltTxt}
            height={100}
            src="https://picsum.photos/100"
            width={100}
          />
        }
      />
    );

    expect(
      rtlScreen.getByRole('img', { name: frontAltTxt })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('img', { name: backAltTxt })
    ).toBeInTheDocument();
  });
});
