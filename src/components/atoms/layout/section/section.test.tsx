import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Section } from './section';

const content = 'Section content.';

describe('Section', () => {
  it('renders its children', () => {
    render(<Section>{content}</Section>);
    expect(rtlScreen.getByText(content)).toBeInTheDocument();
  });
});
