import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../../tests/utils';
import { MotionProvider } from '../../../../../utils/providers';
import { MotionToggle } from './motion-toggle';

describe('MotionToggle', () => {
  it('renders a radio group of two radio buttons', () => {
    render(
      <MotionProvider attribute="enim" hasReducedMotion storageKey="autem">
        <MotionToggle />
      </MotionProvider>
    );

    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Animations:/i,
      })
    ).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('radio')).toHaveLength(2);
  });
});
