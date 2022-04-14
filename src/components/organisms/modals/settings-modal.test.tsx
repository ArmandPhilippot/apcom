import { render, screen } from '@test-utils';
import SettingsModal from './settings-modal';

describe('SettingsModal', () => {
  it('renders a theme toggle setting', () => {
    render(<SettingsModal />);
    expect(
      screen.getByRole('checkbox', { name: /^Theme:/i })
    ).toBeInTheDocument();
  });

  it('renders a code blocks toggle setting', () => {
    render(<SettingsModal />);
    expect(
      screen.getByRole('checkbox', { name: /^Code blocks:/i })
    ).toBeInTheDocument();
  });

  it('renders a motion setting', () => {
    render(<SettingsModal />);
    expect(
      screen.getByRole('checkbox', { name: /^Animations:/i })
    ).toBeInTheDocument();
  });

  it('renders a Ackee setting', () => {
    render(<SettingsModal />);
    expect(
      screen.getByRole('combobox', { name: /^Tracking:/i })
    ).toBeInTheDocument();
  });
});
