import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Icon } from '../../../atoms';
import { FlippingLabel } from './flipping-label';

describe('FlippingLabel', () => {
  it('renders a label', () => {
    const label = 'vero quo inventore';
    render(
      <FlippingLabel
        icon={<Icon shape="arrow" />}
        isActive={false}
        label={label}
      />
    );
    expect(rtlScreen.getByText(label)).toBeInTheDocument();
  });
});
