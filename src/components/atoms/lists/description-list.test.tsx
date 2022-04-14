import { render } from '@test-utils';
import DescriptionList, { DescriptionListItem } from './description-list';

const items: DescriptionListItem[] = [
  { id: 'term-1', term: 'Term 1:', value: ['Value for term 1'] },
  { id: 'term-2', term: 'Term 2:', value: ['Value for term 2'] },
  {
    id: 'term-3',
    term: 'Term 3:',
    value: ['Value 1 for term 3', 'Value 2 for term 3', 'Value 3 for term 3'],
  },
  { id: 'term-4', term: 'Term 4:', value: ['Value for term 4'] },
];

describe('DescriptionList', () => {
  it('renders a list of terms and description', () => {
    const { container } = render(<DescriptionList items={items} />);
    expect(container).toBeDefined();
  });
});