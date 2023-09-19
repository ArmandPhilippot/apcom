import { render, screen } from '../../../../tests/utils';
import Overview, { type OverviewMeta } from './overview';

const cover = {
  alt: 'Incidunt unde quam',
  height: 480,
  src: 'http://placeimg.com/640/480/cats',
  width: 640,
};

const data: OverviewMeta = {
  creation: { date: '2022-05-09' },
  license: 'Dignissimos ratione veritatis',
};

describe('Overview', () => {
  it('renders some data', () => {
    render(<Overview meta={data} />);
    expect(screen.getByText(data.license!)).toBeInTheDocument();
  });

  it('renders a cover', () => {
    render(<Overview cover={cover} meta={data} />);
    expect(screen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });
});
