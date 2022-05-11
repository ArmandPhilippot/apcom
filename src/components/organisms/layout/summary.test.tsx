import { render, screen } from '@test-utils';
import Summary from './summary';

const cover = {
  alt: 'A cover',
  height: 480,
  src: 'http://placeimg.com/640/480',
  width: 640,
};

const excerpt =
  'Perspiciatis quasi libero nemo non eligendi nam minima. Deleniti expedita tempore. Praesentium explicabo molestiae eaque consectetur vero. Quae nostrum quisquam similique. Ut hic est quas ut esse quisquam nobis.';

const meta = {
  dates: { publication: '2022-04-11' },
  readingTime: { wordsCount: excerpt.split(' ').length },
  thematics: [
    { id: 'cat-1', name: 'Cat 1', url: '#' },
    { id: 'cat-2', name: 'Cat 2', url: '#' },
  ],
  commentsCount: 1,
};

const title = 'Odio odit necessitatibus';

const url = '#';

describe('Summary', () => {
  it('renders a title wrapped in a h2 element', () => {
    render(
      <Summary
        excerpt={excerpt}
        meta={meta}
        title={title}
        titleLevel={2}
        url={url}
      />
    );
    expect(
      screen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });

  it('renders an excerpt', () => {
    render(<Summary excerpt={excerpt} meta={meta} title={title} url={url} />);
    expect(screen.getByText(excerpt)).toBeInTheDocument();
  });

  it('renders a cover', () => {
    render(
      <Summary
        cover={cover}
        excerpt={excerpt}
        meta={meta}
        title={title}
        url={url}
      />
    );
    expect(screen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });

  it('renders a link to the full post', () => {
    render(<Summary excerpt={excerpt} meta={meta} title={title} url={url} />);
    expect(screen.getByRole('link', { name: title })).toBeInTheDocument();
  });

  it('renders a read more link', () => {
    render(<Summary excerpt={excerpt} meta={meta} title={title} url={url} />);
    expect(
      screen.getByRole('link', { name: `Read more about ${title}` })
    ).toBeInTheDocument();
  });

  it('renders some meta', () => {
    render(<Summary excerpt={excerpt} meta={meta} title={title} url={url} />);
    expect(screen.getByText(meta.thematics[0].name)).toBeInTheDocument();
  });
});
