/* eslint-disable react/jsx-no-literals */
import { Heading } from '../../atoms';
import type { PageSection } from './sectioned-layout';

export const sections: PageSection[] = [
  {
    id: 'section-1',
    children: (
      <>
        <Heading level={2}>Section 1</Heading>
        <div>
          Qui suscipit ea et aut dicta. Quia ut dignissimos. Sapiente beatae
          voluptatem quis et. Nemo vitae magni. Nihil iste officia est sed esse
          molestiae doloribus. Quia temporibus nobis ea fuga quis incidunt
          doloribus eaque.
        </div>
      </>
    ),
  },
  {
    id: 'section-2',
    children: (
      <>
        <Heading level={2}>Section 2</Heading>
        <div>
          Reprehenderit aut magnam ut quos. Voluptatibus beatae et. Earum non
          atque voluptatum illum rem distinctio repellat.
        </div>
      </>
    ),
  },
  {
    id: 'section-3',
    children: (
      <>
        <Heading level={2}>Section 3</Heading>
        <div>
          Placeat rem dolores dolore illum earum officia dolore. Ut est ducimus.
          Officia eveniet pariatur ut laboriosam voluptatibus aut doloremque
          natus quis.
        </div>
      </>
    ),
  },
  {
    id: 'section-4',
    children: (
      <>
        <Heading level={2}>Section 4</Heading>
        <div>
          Vitae facere ipsa eum sunt debitis veritatis dolorem labore qui.
          Dolores recusandae omnis aut. Repudiandae quia neque porro in
          blanditiis. A atque minima fugit. Totam quidem voluptas natus velit
          at.
        </div>
      </>
    ),
  },
];
