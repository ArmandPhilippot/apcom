import { render, screen } from '@test-utils';
import ImageWidget from './image-widget';

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
      <ImageWidget expanded={true} img={img} title={title} level={titleLevel} />
    );
    expect(screen.getByRole('img', { name: img.alt })).toBeInTheDocument();
  });

  it('renders a link', () => {
    render(
      <ImageWidget
        expanded={true}
        img={img}
        title={title}
        level={titleLevel}
        url={url}
      />
    );
    expect(screen.getByRole('link', { name: img.alt })).toHaveAttribute(
      'href',
      url
    );
  });

  it('renders a description', () => {
    render(
      <ImageWidget
        expanded={true}
        img={img}
        description={description}
        title={title}
        level={titleLevel}
      />
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
