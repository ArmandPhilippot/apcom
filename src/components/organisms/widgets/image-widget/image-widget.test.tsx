import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import NextImage from 'next/image';
import { Heading } from '../../../atoms';
import { ImageWidget } from './image-widget';

describe('ImageWidget', () => {
  it('render the widget heading and an image', () => {
    const heading = 'quam tempore ea';
    const headingLvl = 3;
    const altTxt = 'enim';

    render(
      <ImageWidget
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        img={
          <NextImage
            alt={altTxt}
            height={480}
            src="https://picsum.photos/640/480"
            width={640}
          />
        }
      />
    );

    expect(
      rtlScreen.getByRole('heading', { level: headingLvl })
    ).toHaveTextContent(heading);
    expect(rtlScreen.getByRole('img')).toHaveAccessibleName(altTxt);
  });

  it('can render an image wrapped in a link', () => {
    const heading = 'quam tempore ea';
    const headingLvl = 3;
    const altTxt = 'enim';
    const url = 'https://example.test';

    render(
      <ImageWidget
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        img={
          <NextImage
            alt={altTxt}
            height={480}
            src="https://picsum.photos/640/480"
            width={640}
          />
        }
        url={url}
      />
    );

    expect(rtlScreen.getByRole('link')).toHaveAttribute('href', url);
    expect(rtlScreen.getByRole('img')).toHaveAccessibleName(altTxt);
  });

  it('can render an image with a description', () => {
    const heading = 'quam tempore ea';
    const headingLvl = 3;
    const altTxt = 'enim';
    const desc = 'itaque laudantium ut';

    render(
      <ImageWidget
        description={desc}
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        img={
          <NextImage
            alt={altTxt}
            height={480}
            src="https://picsum.photos/640/480"
            width={640}
          />
        }
      />
    );

    expect(rtlScreen.getByRole('figure')).toHaveAccessibleName(desc);
  });
});
