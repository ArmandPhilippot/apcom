import { render } from '@tests/utils';
import DescriptionList, { DescriptionListItem } from './description-list';

const items: DescriptionListItem[] = [
  { id: 'term-1', label: 'Term 1:', value: ['Value for term 1'] },
  { id: 'term-2', label: 'Term 2:', value: ['Value for term 2'] },
  {
    id: 'term-3',
    label: 'Term 3:',
    value: ['Value 1 for term 3', 'Value 2 for term 3', 'Value 3 for term 3'],
  },
  { id: 'term-4', label: 'Term 4:', value: ['Value for term 4'] },
];

describe('DescriptionList', () => {
  it('renders a list of terms and description', () => {
    const { container } = render(<DescriptionList items={items} />);
    expect(container).toBeDefined();
  });
});
