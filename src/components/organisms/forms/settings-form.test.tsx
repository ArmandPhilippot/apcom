import { render, screen } from '@test-utils';
import SettingsForm from './settings-form';

const ackeeStorageKey = 'ackee-tracking';
const motionStorageKey = 'reduce-motion';

describe('SettingsForm', () => {
  it('renders a form', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('form', { name: /^Settings form/i })
    ).toBeInTheDocument();
  });

  it('renders a theme toggle setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('checkbox', { name: /^Theme:/i })
    ).toBeInTheDocument();
  });

  it('renders a code blocks toggle setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('checkbox', { name: /^Code blocks:/i })
    ).toBeInTheDocument();
  });

  it('renders a motion setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('checkbox', { name: /^Animations:/i })
    ).toBeInTheDocument();
  });

  it('renders a Ackee setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('combobox', { name: /^Tracking:/i })
    ).toBeInTheDocument();
  });
});
