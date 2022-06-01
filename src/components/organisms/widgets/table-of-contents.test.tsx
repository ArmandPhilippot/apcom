import { render, screen } from '@tests/utils';
import TableOfContents from './table-of-contents';

describe('TableOfContents', () => {
  it('renders the ToC title', () => {
    const divEl = document.createElement('div');
    render(<TableOfContents wrapper={divEl} />);
    expect(
      screen.getByRole('heading', { level: 2, name: /Table of Contents/i })
    ).toBeInTheDocument();
  });
});
