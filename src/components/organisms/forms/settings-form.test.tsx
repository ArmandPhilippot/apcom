import { render, screen } from '@test-utils';
import SettingsForm from './settings-form';

describe('SettingsForm', () => {
  it('renders a form', () => {
    render(<SettingsForm />);
    expect(
      screen.getByRole('form', { name: /^Settings form/i })
    ).toBeInTheDocument();
  });

  it('renders a theme toggle setting', () => {
    render(<SettingsForm />);
    expect(
      screen.getByRole('checkbox', { name: /^Theme:/i })
    ).toBeInTheDocument();
  });

  it('renders a code blocks toggle setting', () => {
    render(<SettingsForm />);
    expect(
      screen.getByRole('checkbox', { name: /^Code blocks:/i })
    ).toBeInTheDocument();
  });

  it('renders a motion setting', () => {
    render(<SettingsForm />);
    expect(
      screen.getByRole('checkbox', { name: /^Animations:/i })
    ).toBeInTheDocument();
  });

  it('renders a Ackee setting', () => {
    render(<SettingsForm />);
    expect(
      screen.getByRole('combobox', { name: /^Tracking:/i })
    ).toBeInTheDocument();
  });
});
