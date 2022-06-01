import { render, screen } from '@tests/utils';
import Section from './section';

const title = 'Section title';
const content = 'Section content.';

describe('Section', () => {
  it('renders a title (h2)', () => {
    render(<Section title={title} content={content} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(title);
  });

  it('renders a content', () => {
    render(<Section title={title} content={content} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
