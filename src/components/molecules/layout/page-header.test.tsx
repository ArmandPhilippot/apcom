import { render, screen } from '../../../../tests/utils';
import PageHeader from './page-header';

const title = 'Non nemo amet';
const intro =
  'Suscipit omnis minima doloribus commodi. Laudantium similique ut enim voluptatem soluta maxime autem et.';

describe('PageHeader', () => {
  it('renders a title', () => {
    render(<PageHeader title={title} intro={intro} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title);
  });

  it('renders an introduction', () => {
    render(<PageHeader title={title} intro={intro} />);
    expect(screen.getByText(intro)).toBeInTheDocument();
  });
});
