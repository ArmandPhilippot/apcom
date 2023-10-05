import type { RadioGroupItem } from './radio-group';

export const getOptions = (name = 'group1') => {
  const value1 = 'option1';
  const value2 = 'option2';
  const value3 = 'option3';
  const value4 = 'option4';
  const value5 = 'option5';

  const options: RadioGroupItem[] = [
    {
      id: `${name}-${value1}`,
      label: 'Option 1',
      value: value1,
    },
    {
      id: `${name}-${value2}`,
      label: 'Option 2',
      value: value2,
    },
    {
      id: `${name}-${value3}`,
      label: 'Option 3',
      value: value3,
    },
    {
      id: `${name}-${value4}`,
      label: 'Option 4',
      value: value4,
    },
    {
      id: `${name}-${value5}`,
      label: 'Option 5',
      value: value5,
    },
  ];

  return options;
};

export const initialChoice = 'option2';
