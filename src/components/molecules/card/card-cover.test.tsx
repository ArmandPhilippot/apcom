import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import NextImage from 'next/image';
import { CardCover } from './card-cover';

describe('CardCover', () => {
  it('renders a cover', () => {
    const altTxt = 'nam cupiditate ex';

    render(
      <CardCover>
        <NextImage
          alt={altTxt}
          height={480}
          src="https://picsum.photos/640/480"
          width={640}
        />
      </CardCover>
    );

    expect(rtlScreen.getByRole('img', { name: altTxt })).toBeInTheDocument();
  });
});
