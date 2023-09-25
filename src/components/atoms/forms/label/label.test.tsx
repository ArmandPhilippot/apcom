import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../tests/utils';
import { Label } from './label';

describe('Label', () => {
  it('renders a field label', () => {
    render(<Label>A label</Label>);
    expect(screen.getByText('A label')).toBeInTheDocument();
  });
});
