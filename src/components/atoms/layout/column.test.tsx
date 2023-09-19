import { render, screen } from '../../../../tests/utils';
import Column from './column';

const body =
  'Non praesentium voluptas quisquam ex est. Distinctio accusamus facilis libero in aut. Et veritatis quo impedit fugit amet sit accusantium. Ut est rerum asperiores sint libero eveniet. Molestias placeat recusandae suscipit eligendi sunt hic.';

describe('Column', () => {
  it('renders the column body', () => {
    render(<Column>{body}</Column>);
    expect(screen.getByText(body)).toBeInTheDocument();
  });
});
