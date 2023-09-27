import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Article } from './article';

describe('Article', () => {
  it('renders the contents of an article', () => {
    const children = 'The article content.';

    render(<Article>{children}</Article>);

    expect(rtlScreen.getByRole('article')).toHaveTextContent(children);
  });
});
