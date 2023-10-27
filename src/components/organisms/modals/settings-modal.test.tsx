import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { SettingsModal } from './settings-modal';

describe('SettingsModal', () => {
  it('renders the modal heading', () => {
    render(<SettingsModal />);
    expect(rtlScreen.getByText(/Settings/i)).toBeInTheDocument();
  });

  it('renders a settings form', () => {
    render(<SettingsModal />);
    expect(
      rtlScreen.getByRole('form', { name: /^Settings form/i })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('radiogroup', { name: /^Theme:/i })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('radiogroup', { name: /^Code blocks:/i })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('radiogroup', { name: /^Animations:/i })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('radiogroup', { name: /^Tracking:/i })
    ).toBeInTheDocument();
  });
});
