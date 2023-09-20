import { render, screen } from '../../../../tests/utils';
import { List, type ListItem } from './list';

const items: ListItem[] = [
  { id: 'item-1', value: 'Item 1' },
  { id: 'item-2', value: 'Item 2' },
  {
    child: [
      { id: 'nested-item-1', value: 'Nested item 1' },
      { id: 'nested-item-2', value: 'Nested item 2' },
    ],
    id: 'item-3',
    value: 'Item 3',
  },
  { id: 'item-4', value: 'Item 4' },
];

describe('List', () => {
  it('renders a nested unordered list', () => {
    render(<List items={items} />);
    const listItems = screen.getAllByRole('list');
    listItems.forEach((listItem) =>
      expect(listItem).toHaveClass('list--unordered')
    );
  });
});
