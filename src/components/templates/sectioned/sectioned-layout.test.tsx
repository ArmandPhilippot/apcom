import { render, screen } from '@test-utils';
import SectionedLayout from './sectioned-layout';

const sections = [
  {
    title: 'Section 1',
    content:
      'Qui suscipit ea et aut dicta. Quia ut dignissimos. Sapiente beatae voluptatem quis et. Nemo vitae magni. Nihil iste officia est sed esse molestiae doloribus. Quia temporibus nobis ea fuga quis incidunt doloribus eaque.',
  },
  {
    title: 'Section 2',
    content:
      'Reprehenderit aut magnam ut quos. Voluptatibus beatae et. Earum non atque voluptatum illum rem distinctio repellat.',
  },
  {
    title: 'Section 3',
    content:
      'Placeat rem dolores dolore illum earum officia dolore. Ut est ducimus. Officia eveniet pariatur ut laboriosam voluptatibus aut doloremque natus quis.',
  },
  {
    title: 'Section 4',
    content:
      'Vitae facere ipsa eum sunt debitis veritatis dolorem labore qui. Dolores recusandae omnis aut. Repudiandae quia neque porro in blanditiis. A atque minima fugit. Totam quidem voluptas natus velit at.',
  },
];

describe('SectionedLayout', () => {
  it('renders the correct number of section', () => {
    render(<SectionedLayout sections={sections} />);
    expect(screen.getAllByRole('heading', { name: /^Section/ })).toHaveLength(
      sections.length
    );
  });
});
