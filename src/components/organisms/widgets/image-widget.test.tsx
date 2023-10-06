import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Heading } from '../../atoms';
import { ImageWidget } from './image-widget';

const description = 'Ut vitae sit';

const img = {
  alt: 'Et perferendis quaerat',
  height: 480,
  src: 'http://placeimg.com/640/480/nature',
  width: 640,
};

const title = 'Fugiat cumque et';
const titleLevel = 2;

const url = '/another-page';

describe('ImageWidget', () => {
  it('renders an image', () => {
    render(
      <ImageWidget
        heading={<Heading level={titleLevel}>{title}</Heading>}
        image={img}
      />
    );
    expect(rtlScreen.getByRole('img', { name: img.alt })).toBeInTheDocument();
  });

  it('renders an image with a link', () => {
    render(
      <ImageWidget
        heading={<Heading level={titleLevel}>{title}</Heading>}
        image={img}
        url={url}
      />
    );
    expect(rtlScreen.getByRole('link', { name: img.alt })).toHaveAttribute(
      'href',
      url
    );
  });

  it('renders a description', () => {
    render(
      <ImageWidget
        heading={<Heading level={titleLevel}>{title}</Heading>}
        image={img}
        description={description}
      />
    );
    expect(rtlScreen.getByText(description)).toBeInTheDocument();
  });
});
