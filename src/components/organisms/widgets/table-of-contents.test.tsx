import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { TableOfContents } from './table-of-contents';

describe('TableOfContents', () => {
  it('renders a title', () => {
    const divEl = document.createElement('div');
    render(<TableOfContents wrapper={divEl} />);
    expect(rtlScreen.getByText(/Table of Contents/i)).toBeInTheDocument();
  });
});
