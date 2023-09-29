import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { List } from './list';
import { ListItem } from './list-item';

const items = [
  { id: 'item-1', label: 'Item 1' },
  { id: 'item-2', label: 'Item 2' },
  { id: 'item-3', label: 'Item 3' },
  { id: 'item-4', label: 'Item 4' },
];

describe('List', () => {
  it('renders a list of items', () => {
    render(
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('can render an ordered list', () => {
    render(
      <List isOrdered>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('list--ordered');
  });

  it('can render a hierarchical list', () => {
    render(
      <List isHierarchical isOrdered>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('list--hierarchical');
  });

  it('can render an unordered list', () => {
    render(
      <List isOrdered={false}>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('list--unordered');
  });

  it('can render list items in a row', () => {
    render(
      <List isInline>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('list--inline');
  });

  it('can render list items as one column', () => {
    render(
      <List isInline={false}>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('list--stack');
  });

  it('can render a list with marker', () => {
    render(
      <List hideMarker={false}>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('list--has-marker');
  });

  it('can render a list without marker', () => {
    render(
      <List hideMarker>
        {items.map((item) => (
          <ListItem key={item.id}>{item.label}</ListItem>
        ))}
      </List>
    );

    expect(rtlScreen.getByRole('list')).toHaveClass('list--no-marker');
  });
});
