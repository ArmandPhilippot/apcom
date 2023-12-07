import { beforeEach, describe, expect, it } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useHeadingsTree } from './use-headings-tree';

const labels = {
  h1: 'Title 1',
  firstH2: 'First subtitle',
  secondH2: 'Second subtitle',
};

describe('useHeadingsTree', () => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
<h1>${labels.h1}</h1>
<h2>${labels.firstH2}</h2>
<p>Expedita et necessitatibus qui numquam sunt et ut et. Earum nostrum esse nemo nisi qui. Ab in iure qui repellat voluptatibus nostrum odit aut qui. Architecto eum fugit quod excepturi numquam qui maxime accusantium. Fugit ipsam harum tempora.</p>
<h2>${labels.secondH2}</h2>
<p>Totam cumque aut ipsum. Necessitatibus magnam necessitatibus. Qui illo nulla non ab. Accusamus voluptatem ab fugiat voluptas aspernatur velit dolore reprehenderit. Voluptatem quod minima asperiores voluptatum distinctio cumque quo.</p>`;

  beforeEach(() => {
    document.body.appendChild(wrapper);
  });

  afterEach(() => {
    document.body.removeChild(wrapper);
  });

  it('returns a ref callback and the headings tree', () => {
    const { result } = renderHook(() => useHeadingsTree());

    act(() => result.current.ref(wrapper));

    expect(result.current.tree.length).toBe(1);
    expect(result.current.tree[0].label).toBe(labels.h1);
    expect(result.current.tree[0].children.length).toBe(2);
  });

  it('can return a headings tree starting at the specified level', () => {
    const { result } = renderHook(() => useHeadingsTree({ fromLevel: 2 }));

    act(() => result.current.ref(wrapper));

    expect(result.current.tree.length).toBe(2);
    expect(result.current.tree[0].label).toBe(labels.firstH2);
    expect(result.current.tree[1].label).toBe(labels.secondH2);
  });

  it('can return a headings tree stopping at the specified level', () => {
    const { result } = renderHook(() => useHeadingsTree({ toLevel: 1 }));

    act(() => result.current.ref(wrapper));

    expect(result.current.tree.length).toBe(1);
    expect(result.current.tree[0].label).toBe(labels.h1);
    expect(result.current.tree[0].children).toStrictEqual([]);
  });

  it('uses a mutation observer to watch for DOM changes', async () => {
    const newH2 = document.createElement('h2');
    newH2.innerHTML = 'ut molestiae exercitationem';
    const { result } = renderHook(() => useHeadingsTree({ fromLevel: 2 }));

    act(() => result.current.ref(wrapper));

    expect(result.current.tree.length).toBe(2);

    act(() => wrapper.appendChild(newH2));

    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expect(result.current.tree.length).toBe(3);
    });
  });

  it('throws an error if the options are invalid', () => {
    expect(() => useHeadingsTree({ fromLevel: 2, toLevel: 1 })).toThrowError(
      'Invalid options: `fromLevel` must be lower or equal to `toLevel`.'
    );
  });
});
