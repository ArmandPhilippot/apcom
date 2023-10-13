import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Code } from './code';

/**
 * Code - Storybook Meta
 */
export default {
  title: 'Molecules/Code',
  component: Code,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The code sample.',
      type: {
        name: 'string',
        required: true,
      },
    },
    filterPattern: {
      control: {
        type: 'text',
      },
      description: 'Define a pattern to filter the command line output.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    language: {
      control: {
        type: 'text',
      },
      description: 'The code sample language.',
      type: {
        name: 'string',
        required: true,
      },
    },
    plugins: {
      description: 'An array of Prism plugins to activate.',
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

const javascriptCodeSample = `
const foo = () => {
  return 'bar';
}
`;

/**
 * Code Stories - Code sample
 */
export const CodeSample = Template.bind({});
CodeSample.args = {
  children: javascriptCodeSample,
  language: 'javascript',
};

/**
 * Code Stories - Highlighting
 *
 * @todo Find a way to make it working: line-highlight plugin is not loaded.
 */
export const Highlighting = Template.bind({});
Highlighting.args = {
  children: javascriptCodeSample,
  highlight: '3',
  language: 'javascript',
};

// cSpell:ignore xinitrc
const commandLineCode = `
ls -lah
#output#drwxr-x---+ 42 armand armand 4,0K 17 april 11:15  .
#output#drwxr-xr-x   4 root   root   4,0K 30 mai    2021  ..
#output#-rw-r--r--   1 armand armand 2,0K 21 jul.  2021  .xinitrc
`;

/**
 * Code Stories - Command Line
 */
export const CommandLine = Template.bind({});
CommandLine.args = {
  children: commandLineCode,
  cmdOutputFilter: '#output#',
  isCmd: true,
  language: 'bash',
};

// cSpell:ignore lcov
const treeSample = `
.
├── bin
│  └── deploy.sh
├── CHANGELOG.md
├── commitlint.config.cjs
├── coverage
│  ├── clover.xml
│  ├── coverage-final.json
│  ├── lcov-report
│  └── lcov.info
├── cspell.json
├── cypress.config.js
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── jest.setup.js
├── lang
│  ├── en.json
│  └── fr.json
├── LICENSE
├── lint-staged.config.js
├── mdx.d.ts
├── next-env.d.ts
├── next-sitemap.config.cjs
├── next.config.js
├── package.json
├── public
│  ├── apple-touch-icon.png
│  ├── armand-philippot.jpg
│  ├── favicon.ico
│  ├── icon-192.png
│  ├── icon-512.png
│  ├── icon.svg
│  ├── manifest.webmanifest
│  ├── prism
│  ├── projects
│  ├── robots.txt
│  ├── sitemap-0.xml
│  ├── sitemap.xml
│  └── vercel.svg
├── README.md
├── src
│  ├── assets
│  ├── components
│  ├── content
│  ├── i18n
│  ├── pages
│  ├── services
│  ├── styles
│  ├── types
│  └── utils
├── tests
│  ├── cypress
│  ├── jest
│  └── utils
├── tsconfig.eslint.json
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── yarn.lock`;

/**
 * Code Stories - Tree view
 *
 * @todo Find a way to make it working: treeview plugin is not loaded.
 */
export const TreeView = Template.bind({});
TreeView.args = {
  children: treeSample,
  language: 'treeview',
};

const diffSample = `
--- file1.js	2023-10-13 19:17:05.540644084 +0200
+++ file2.js	2023-10-13 19:17:15.310564281 +0200
@@ -1,2 +1 @@
-let foo = bar.baz([1, 2, 3]);
-foo = foo + 1;
+const foo = bar.baz([1, 2, 3]) + 1;`;

/**
 * Code Stories - Diff
 */
export const Diff = Template.bind({});
Diff.args = {
  children: diffSample,
  isDiff: true,
  language: 'diff',
};
