import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TooltipProps } from '../modals/tooltip';
import { Help } from '../modals/tooltip.stories';
import FieldsetComponent from './fieldset';
import { body, legend, Tooltip } from './fieldset.fixture';

/**
 * Fieldset - Storybook Meta
 */
export default {
  title: 'Atoms/Forms/Fieldset',
  component: FieldsetComponent,
  args: {
    legendPosition: 'stacked',
    role: 'group',
  },
  argTypes: {
    bodyClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the body wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    children: {
      control: {
        type: null,
      },
      description: 'The fieldset body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the fieldset.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    legend: {
      control: {
        type: 'text',
      },
      description: 'The fieldset legend.',
      type: {
        name: 'string',
        required: true,
      },
    },
    legendClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the legend.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    legendPosition: {
      control: {
        type: 'select',
      },
      description: 'Determine the legend position.',
      options: ['inline', 'stacked'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'inline' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    role: {
      control: {
        type: 'select',
      },
      description: 'An accessible role.',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'group' },
      },
      options: ['group', 'radiogroup', 'presentation', 'none'],
      type: {
        name: 'string',
        required: false,
      },
    },
    Tooltip: {
      control: {
        type: null,
      },
      description: 'Add an optional tooltip.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof FieldsetComponent>;

const Template: ComponentStory<typeof FieldsetComponent> = (args) => (
  <FieldsetComponent {...args} />
);

/**
 * Fieldset Stories - Stacked legend
 */
export const StackedLegend = Template.bind({});
StackedLegend.args = {
  children: body,
  legend: legend,
};

/**
 * Fieldset Stories - Inlined legend
 */
export const InlinedLegend = Template.bind({});
InlinedLegend.args = {
  children: body,
  legend: legend,
  legendPosition: 'inline',
};

/**
 * Fieldset Stories - Stacked legend with tooltip
 */
export const StackedLegendWithTooltip = Template.bind({});
StackedLegendWithTooltip.args = {
  children: body,
  legend: legend,
  Tooltip,
};

/**
 * Fieldset Stories - Inlined legend with tooltip
 */
export const InlinedLegendWithTooltip = Template.bind({});
InlinedLegendWithTooltip.args = {
  children: body,
  legend: legend,
  legendPosition: 'inline',
  Tooltip,
};
