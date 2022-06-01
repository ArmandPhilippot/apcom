import { render, screen } from '@tests/utils';
import DescriptionListItem from './description-list-item';

const itemLabel = 'Repellendus corporis facilis';
const itemValue = ['quos', 'eum'];

describe('DescriptionListItem', () => {
  it('renders a couple of label', () => {
    render(<DescriptionListItem label={itemLabel} value={itemValue} />);
    expect(screen.getByRole('term')).toHaveTextContent(itemLabel);
  });

  it('renders the right number of values', () => {
    render(<DescriptionListItem label={itemLabel} value={itemValue} />);
    expect(screen.getAllByRole('definition')).toHaveLength(itemValue.length);
  });
});
