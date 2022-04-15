import { render, screen } from '@test-utils';
import Overview from './overview';

const cover = {
  alt: 'Incidunt unde quam',
  height: 480,
  src: 'http://placeimg.com/640/480/cats',
  width: 640,
};

const meta = {
  publication: { name: 'Illo ut odio:', value: 'Sequi et excepturi' },
  update: {
    name: 'Perspiciatis vel laudantium:',
    value: 'Dignissimos ratione veritatis',
  },
};

describe('Overview', () => {
  it('renders some meta', () => {
    render(<Overview meta={meta} />);
    expect(screen.getByText(meta['publication'].name)).toBeInTheDocument();
  });

  it('renders a cover', () => {
    render(<Overview meta={meta} cover={cover} />);
    expect(screen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });
});
