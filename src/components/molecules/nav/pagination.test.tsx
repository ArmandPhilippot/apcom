import { render, screen } from '../../../../tests/utils';
import { Pagination } from './pagination';

const total = 50;
const perPage = 10;

describe('Pagination', () => {
  it('renders previous and next page links', () => {
    render(<Pagination current={2} total={total} perPage={perPage} />);
    expect(
      screen.getByRole('link', { name: /Previous page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Next page/i })
    ).toBeInTheDocument();
  });

  it('renders the page links except for the current one', () => {
    render(
      <Pagination current={2} siblings={2} total={total} perPage={perPage} />
    );
    expect(screen.getAllByRole('link', { name: /Page / })).toHaveLength(
      total / perPage - 1
    );
  });
});
