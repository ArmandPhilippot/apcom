import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Section } from './section';

const content = 'Section content.';

describe('Section', () => {
  it('renders its body', () => {
    render(<Section>{content}</Section>);
    expect(rtlScreen.getByText(content)).toBeInTheDocument();
  });

  it('renders a section with border', () => {
    render(<Section hasBorder>{content}</Section>);
    expect(rtlScreen.getByText(content)).toHaveClass('wrapper--borders');
  });

  it('renders a light section', () => {
    render(<Section variant="light">{content}</Section>);
    expect(rtlScreen.getByText(content)).toHaveClass('wrapper--light');
  });

  it('renders a dark section', () => {
    render(<Section variant="dark">{content}</Section>);
    expect(rtlScreen.getByText(content)).toHaveClass('wrapper--dark');
  });
});
