import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useHeadingsTree } from './use-headings-tree';

const labels = {
  h1: 'Title 1',
  firstH2: 'First subtitle',
  secondH2: 'Second subtitle',
};

describe('useHeadingsTree', () => {
  it('returns a ref object and the headings tree', () => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
<h1>${labels.h1}</h1>
<h2>${labels.firstH2}</h2>
<p>Expedita et necessitatibus qui numquam sunt et ut et. Earum nostrum esse nemo nisi qui. Ab in iure qui repellat voluptatibus nostrum odit aut qui. Architecto eum fugit quod excepturi numquam qui maxime accusantium. Fugit ipsam harum tempora.</p>
<h2>${labels.secondH2}</h2>
<p>Totam cumque aut ipsum. Necessitatibus magnam necessitatibus. Qui illo nulla non ab. Accusamus voluptatem ab fugiat voluptas aspernatur velit dolore reprehenderit. Voluptatem quod minima asperiores voluptatum distinctio cumque quo.</p>`;

    const wrapperRef = { current: wrapper };
    const { result } = renderHook(() => useHeadingsTree(wrapperRef));

    expect(result.current.length).toBe(1);
    expect(result.current[0].label).toBe(labels.h1);
    expect(result.current[0].children.length).toBe(2);
  });

  it('can return a headings tree starting at the specified level', () => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
<h1>${labels.h1}</h1>
<h2>${labels.firstH2}</h2>
<p>Expedita et necessitatibus qui numquam sunt et ut et. Earum nostrum esse nemo nisi qui. Ab in iure qui repellat voluptatibus nostrum odit aut qui. Architecto eum fugit quod excepturi numquam qui maxime accusantium. Fugit ipsam harum tempora.</p>
<h2>${labels.secondH2}</h2>
<p>Totam cumque aut ipsum. Necessitatibus magnam necessitatibus. Qui illo nulla non ab. Accusamus voluptatem ab fugiat voluptas aspernatur velit dolore reprehenderit. Voluptatem quod minima asperiores voluptatum distinctio cumque quo.</p>`;

    const wrapperRef = { current: wrapper };
    const { result } = renderHook(() =>
      useHeadingsTree(wrapperRef, { fromLevel: 2 })
    );

    expect(result.current.length).toBe(2);
    expect(result.current[0].label).toBe(labels.firstH2);
    expect(result.current[1].label).toBe(labels.secondH2);
  });

  it('can return a headings tree stopping at the specified level', () => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
<h1>${labels.h1}</h1>
<h2>${labels.firstH2}</h2>
<p>Expedita et necessitatibus qui numquam sunt et ut et. Earum nostrum esse nemo nisi qui. Ab in iure qui repellat voluptatibus nostrum odit aut qui. Architecto eum fugit quod excepturi numquam qui maxime accusantium. Fugit ipsam harum tempora.</p>
<h2>${labels.secondH2}</h2>
<p>Totam cumque aut ipsum. Necessitatibus magnam necessitatibus. Qui illo nulla non ab. Accusamus voluptatem ab fugiat voluptas aspernatur velit dolore reprehenderit. Voluptatem quod minima asperiores voluptatum distinctio cumque quo.</p>`;

    const wrapperRef = { current: wrapper };
    const { result } = renderHook(() =>
      useHeadingsTree(wrapperRef, { toLevel: 1 })
    );

    expect(result.current.length).toBe(1);
    expect(result.current[0].label).toBe(labels.h1);
    expect(result.current[0].children).toStrictEqual([]);
  });

  it('throws an error if the options are invalid', () => {
    const wrapperRef = { current: null };

    expect(() =>
      useHeadingsTree(wrapperRef, { fromLevel: 2, toLevel: 1 })
    ).toThrowError(
      'Invalid options: `fromLevel` must be lower or equal to `toLevel`.'
    );
  });
});
