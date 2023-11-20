import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { PageHeader } from './page-header';

const title = 'Non nemo amet';
const intro =
  'Suscipit omnis minima doloribus commodi. Laudantium similique ut enim voluptatem soluta maxime autem et.';

describe('PageHeader', () => {
  it('renders a title', () => {
    render(<PageHeader title={title} intro={intro} />);
    expect(rtlScreen.getByRole('heading', { level: 1 })).toHaveTextContent(
      title
    );
  });

  it('renders an introduction', () => {
    render(<PageHeader title={title} intro={intro} />);
    expect(rtlScreen.getByText(intro)).toBeInTheDocument();
  });
});
