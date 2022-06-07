import { ComponentMeta, ComponentStory } from '@storybook/react';
import CodeComponent from './code';

/**
 * Code - Storybook Meta
 */
export default {
  title: 'Molecules/Layout/Code',
  component: CodeComponent,
  args: {
    filterOutput: false,
    outputPattern: '#output#',
  },
  argTypes: {
    'aria-label': {
      control: {
        type: 'text',
      },
      description: 'An accessible name for the code sample.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
    filterOutput: {
      control: {
        type: 'boolean',
      },
      description: 'Filter the command line output.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
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
    outputPattern: {
      control: {
        type: 'text',
      },
      description: 'The command line output pattern.',
      table: {
        category: 'Options',
        defaultValue: { summary: '#output#' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof CodeComponent>;

const Template: ComponentStory<typeof CodeComponent> = (args) => (
  <CodeComponent {...args} />
);

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
  plugins: ['line-numbers'],
};

const commandLineCode = `
ls -lah
#output#drwxr-x---+ 42 armand armand 4,0K 17 avril 11:15  .
#output#drwxr-xr-x   4 root   root   4,0K 30 mai    2021  ..
#output#-rw-r--r--   1 armand armand 2,0K 21 juil.  2021  .xinitrc
`;

/**
 * Code Stories - Command Line
 */
export const CommandLine = Template.bind({});
CommandLine.args = {
  children: commandLineCode,
  filterOutput: true,
  language: 'bash',
  plugins: ['command-line'],
};
