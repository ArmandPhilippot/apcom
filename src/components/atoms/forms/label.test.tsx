import { render, screen } from '@test-utils';
import Label from './label';

describe('Label', () => {
  it('renders a field label', () => {
    render(<Label htmlFor="a-field-id">A label</Label>);
    expect(screen.getByText('A label')).toBeDefined();
  });
});
