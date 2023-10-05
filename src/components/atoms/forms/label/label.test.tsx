import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('renders a field label', () => {
    render(<Label>A label</Label>);
    expect(rtlScreen.getByText('A label')).toBeInTheDocument();
  });
});
