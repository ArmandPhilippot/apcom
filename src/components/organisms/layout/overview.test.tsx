import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import type { MetaItemData } from '../../molecules';
import { Overview } from './overview';

const cover = {
  alt: 'Incidunt unde quam',
  height: 480,
  src: 'https://picsum.photos/640/480',
  width: 640,
};

const meta = [
  { id: 'creation-date', label: 'Creation date', value: '2022-05-09' },
  { id: 'license', label: 'License', value: 'Dignissimos ratione veritatis' },
] satisfies MetaItemData[];

describe('Overview', () => {
  it('renders some meta', () => {
    render(<Overview meta={meta} />);

    const metaLabels = meta.map((item) => item.label);

    for (const label of metaLabels) {
      expect(rtlScreen.getByText(label)).toBeInTheDocument();
    }
  });

  it('renders a cover', () => {
    render(<Overview cover={cover} meta={meta} />);
    expect(rtlScreen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });
});
