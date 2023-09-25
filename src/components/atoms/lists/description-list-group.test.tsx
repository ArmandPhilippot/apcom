import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { DescriptionListGroup } from './description-list-group';

const itemLabel = 'Repellendus corporis facilis';
const itemValue = ['quos', 'eum'];

describe('DescriptionListGroup', () => {
  it('renders a couple of label', () => {
    render(<DescriptionListGroup label={itemLabel} value={itemValue} />);
    expect(screen.getByRole('term')).toHaveTextContent(itemLabel);
  });

  it('renders the right number of values', () => {
    render(<DescriptionListGroup label={itemLabel} value={itemValue} />);
    expect(screen.getAllByRole('definition')).toHaveLength(itemValue.length);
  });
});
