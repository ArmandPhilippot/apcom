import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { PageSidebar } from './page-sidebar';

describe('PageSidebar', () => {
  it('renders its contents', () => {
    const body =
      'Repellendus dignissimos quos dolores sunt pariatur rem optio qui aut. Dolore optio est quam tenetur minus. Dolorem voluptas id maiores rerum velit omnis esse impedit. Unde reiciendis nisi nostrum et. Quia accusamus asperiores. Commodi est provident sequi eaque ipsa ut necessitatibus.';

    render(<PageSidebar>{body}</PageSidebar>);

    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });
});
